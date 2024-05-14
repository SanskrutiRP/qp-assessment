import { Injectable, Logger } from '@nestjs/common';
import { Inventory } from 'src/db/models/inventory';
import { Order } from 'src/db/models/order';
import {
  checkAdmin,
  groceryExists,
  userExists,
  validateOrder,
} from 'src/helper';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  async createOrder(userId, orderPayload) {
    try {
      this.logger.debug(`inside creating order : ${userId}`);

      const { errors } = await userExists(userId);

      if (errors) {
        return {
          errors,
        };
      }

      const ordersTobePlaced = [];
      const errorsTobeReturned = [];
      for (const order of orderPayload) {
        const { groceryId, quantity } = order;

        const groceryExist = await groceryExists(groceryId);

        if (groceryExist?.errors) {
          errorsTobeReturned.push(groceryExist?.errors);
        }

        const { invalidOrder, data } = await validateOrder(groceryId, quantity);

        if (invalidOrder) {
          errorsTobeReturned.push(invalidOrder);
        }
        ordersTobePlaced.push({
          userId,
          orderDetails: {
            groceryId,
            quantity,
          },
          quantity: data,
        });
      }

      if (ordersTobePlaced?.length > 0) {
        for (const order of ordersTobePlaced) {
          const { userId, orderDetails, quantity } = order;

          const payload = {
            userId,
            orderDetails
          };
          await Order.transaction(async (trx) => {
            await Order.query(trx).insertGraph(payload);
            await Inventory.query(trx).patch({
              groceryId: orderDetails?.groceryId,
              quantity,
            });
          });
        }
      }
      return {
        data: 'Order Placed Successfully',
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
