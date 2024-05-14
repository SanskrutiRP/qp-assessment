import { Injectable, Logger } from '@nestjs/common';
import {
  checkAdmin,
  formatResponse,
  groceryExists,
  userExists,
} from '../helper';
import { Grocery } from 'src/db/models/grocery';
import { Inventory } from 'src/db/models/inventory';

@Injectable()
export class GroceriesService {
  private readonly logger = new Logger(GroceriesService.name);

  async addGrocery(groceryPayload, userId) {
    try {
      const { name, description, category, price, quantity } = groceryPayload;

      this.logger.debug(`inside addGrocery service:: ${name}`);

      const { errors } = await checkAdmin(userId);

      if (errors) {
        return {
          errors,
        };
      }

      const payloadToInsert = {
        name,
        description,
        price,
        category,
        inventory: {
          quantity,
        },
      };
      const addGrocery = await Grocery.query().insertGraph(payloadToInsert);
      return {
        data: addGrocery,
      };
    } catch (error) {
      this.logger.error(error.message);

      return {
        errors: {
          type: 'catch',
          message: 'something went wrong',
        },
      };
    }
  }

  async getGroceries(userId, page, pagesize) {
    try {
      const { errors } = await userExists(userId);

      this.logger.log('getGroceries service:: ');
      if (errors) {
        return {
          errors,
        };
      }
      const groceries = await Grocery.query()
        .select('name', 'description', 'price')
        .withGraphFetched('inventory')
        .page(page, pagesize);

      const formattedResponse = formatResponse(groceries.results);

      return {
        data: formattedResponse,
        total: groceries.total,
      };
    } catch (error) {
      this.logger.error(error.message);

      return {
        error: {
          type: 'catch',
          message: 'something went wrong',
        },
      };
    }
  }

  async deleteGrocery(userId, groceryId) {
    try {
      this.logger.log(`inside deleteGrocery:: ${groceryId}`);

      const { errors } = await checkAdmin(userId);

      if (errors) {
        return {
          errors,
        };
      }

      const groceryExist = await groceryExists(groceryId);

      if (groceryExist?.errors) {
        return {
          errors: groceryExist?.errors,
        };
      }

      await Grocery.query().deleteById(groceryId);

      return {
        data: 'Grocery Deleted Successfully',
      };
    } catch (error) {
      this.logger.error(error.message);

      return {
        error: {
          type: 'catch',
          message: 'something went wrong',
        },
      };
    }
  }

  async updateGrocery(userId, updatePayload, groceryId) {
    try {
      this.logger.log(`inside update grocery:: ${groceryId}`);

      const { errors } = await checkAdmin(userId);
      if (errors) {
        return {
          errors,
        };
      }

      const groceryExist = await groceryExists(groceryId);

      if (groceryExist?.errors) {
        return {
          errors: groceryExist?.errors,
        };
      }

      const updatedGrocery = await Grocery.query().patchAndFetchById(
        groceryId,
        updatePayload,
      );

      return {
        data: updatedGrocery,
        message: 'Grocery updated successfully',
      };
    } catch (error) {
      this.logger.error(error.message);

      return {
        error: {
          type: 'catch',
          message: 'something went wrong',
        },
      };
    }
  }

  async updateInventory(userId, quantity, groceryId) {
    try {
      this.logger.log(`inside update inventory:: ${groceryId}`);

      const { errors } = await checkAdmin(userId);
      if (errors) {
        return {
          errors,
        };
      }

      const groceryExist = await groceryExists(groceryId);

      if (groceryExist?.errors) {
        return {
          errors: groceryExist?.errors,
        };
      }

      const updatedInventory = await Inventory.query().patch({
        groceryId,
        quantity: parseInt(quantity),
      });

      return {
        data: updatedInventory,
        message: 'Grocery inventory updated successfully',
      };
    } catch (error) {
      this.logger.error(error.message);

      return {
        error: {
          type: 'catch',
          message: 'something went wrong',
        },
      };
    }
  }
}
