import { Global, Module } from '@nestjs/common';
import knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import { Grocery } from './models/grocery';
import { User } from './models/user';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

console.log(process.env.DB_USER);
const models = [User, Grocery];
const modelProviders = models.map((model) => ({
  provide: model.name,
  useValue: model,
}));

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const db = knex({
        client: 'pg',
        connection: `postgres://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
        debug: process.env.KNEX_DEBUG === 'true',
        ...knexSnakeCaseMappers(),
      });

      Model.knex(db);

      return db;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
