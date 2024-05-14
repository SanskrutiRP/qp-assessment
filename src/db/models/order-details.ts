import { Model } from 'objection';
import { Inventory } from './inventory';

export class OrderDetails extends Model {
  publicId: string;
  orderId: string;
  groceryId: string;
  quantity: number;
  static get tableName() {
    return 'order_details';
  }

  static get idColumn() {
    return 'public_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        order_id: { type: 'string' },
        grocery_id: { type: 'string' },
        quantity: { type: 'integer' },
      },
    };
  }
}
