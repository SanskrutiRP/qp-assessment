import { Model } from 'objection';
import { Inventory } from './inventory';
import { join } from 'path';

export class Grocery extends Model {
  publicId: string;
  name: string;
  category: string;
  description: string;
  price: number;
  static get tableName() {
    return 'grocery';
  }

  static get idColumn() {
    return 'public_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        name: { type: 'string' },
        category: { type: 'string' },
        description: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      inventory: {
        relation: Model.HasOneRelation,
        modelClass: Inventory,
        filter: (query: any) => query.select('quantity'),
        join: {
          from: 'grocery.publicId',
          to: 'inventory.groceryId',
        },
      },
    };
  }
}
