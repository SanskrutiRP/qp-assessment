import { Model } from 'objection';

export class Inventory extends Model {
  publicId: string;
  groceryId: string;
  quantity: number;

  static get tableName() {
    return 'inventory';
  }

  static get idColumn() {
    return 'public_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        grocery_id: { type: 'string' },
        quantity: { type: 'integer' },
      },
    };
  }
}
