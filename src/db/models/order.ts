import { Model } from 'objection';
import { Inventory } from './inventory';
import { OrderDetails } from './order-details';

export class Order extends Model {
  publicId: string;
  userId: string;
  static get tableName() {
    return 'order';
  }

  static get idColumn() {
    return 'public_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        user_id: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      orderDetails: {
        relation: Model.HasManyRelation,
        modelClass: OrderDetails,
        // filter: (query: any) => query.select('quantity'),
        join: {
          from: 'order.publicId',
          to: 'order_details.orderId',
        },
      },
    };
  }
}
