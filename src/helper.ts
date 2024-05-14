import { Grocery } from 'src/db/models/grocery';
import { User } from 'src/db/models/user';
import { Inventory } from './db/models/inventory';

export const checkAdmin = async (userId) => {
  const isAdminExist = await User.query().findById(userId);

  if (!isAdminExist) {
    return {
      errors: {
        type: 'USER_NOT_AVAILABLE',
        message: 'User not available, please check userId',
      },
    };
  }

  if (isAdminExist?.type != 'admin') {
    return {
      errors: {
        type: 'USER_NOT_ADMIN',
        message: 'Only Admin can add grocery items',
      },
    };
  }

  return {
    data: 'ok',
  };
};

export const userExists = async (userId) => {
  const userExist = await User.query().findById(userId);

  if (!userExist) {
    return {
      errors: {
        type: 'USER_NOT_AVAILABLE',
        message: 'User not available, please check userId',
      },
    };
  }

  return {
    data: userExist,
  };
};

export const groceryExists = async (groceryId) => {
  const groceryExist = await Grocery.query().findById(groceryId);

  if (!groceryExist) {
    return {
      errors: {
        type: 'GROCERY_NOT_AVAILABLE',
        message: 'Grocery not available, please check groceryId',
      },
    };
  }

  return {
    data: groceryExist,
  };
};

export const formatResponse = (payload) => {
  const formatResponse = payload.map((grocery) => {
    grocery.inventory = grocery.inventory.quantity;

    return grocery;
  });

  return formatResponse;
};

export const validateOrder = async (groceryId, quantity) => {
  const inventoryAvailable = await Inventory.query()
    .select('quantity')
    .findOne({ groceryId });

  const inventoryRemaining = inventoryAvailable?.quantity - quantity;

  if (inventoryRemaining < 0) {
    return {
      invalidOrder: {
        type: 'INVENTORY_NOT_AVAILABLE',
        message: 'Sufficient inventory not available',
      },
    };
  }

  return {
    data: inventoryRemaining,
  };
};
