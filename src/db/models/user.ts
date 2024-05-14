import { Model } from 'objection';

export class User extends Model {
  publicId: string;
  name: string;
  emailId: string;
  type: string;
  static get tableName() {
    return 'user';
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
        email_id: { type: 'string' },
        type: { type: 'string' },
      },
    };
  }
}
