import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroceriesController } from './groceries/groceries.controller';
import { GroceriesService } from './groceries/groceries.service';
import { DatabaseModule } from './db/db.module';
import { GroceriesModule } from './groceries/groceries.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [DatabaseModule, GroceriesModule, OrderModule],
  controllers: [AppController, GroceriesController],
  providers: [AppService, GroceriesService],
})
export class AppModule {}
