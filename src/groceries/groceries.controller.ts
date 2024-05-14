import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AddGroceryDto } from './dto/add-grocery';
import { Response, Request } from 'express';
import { GroceriesService } from './groceries.service';
import { UpdateGroceryDto } from './dto/update-grocery';

@Controller('groceries')
export class GroceriesController {
  private readonly logger = new Logger(GroceriesController.name);

  constructor(private readonly groceryService: GroceriesService) {}
  @Post('')
  async addGrocery(
    @Body() groceryPayload: AddGroceryDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<any> {
    const userId = req.headers['user-id'];
    this.logger.log(`inside addGrocery controller:: ${userId}`);

    if (!userId) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('Provide userId in headers');
    }
    const response = await this.groceryService.addGrocery(
      groceryPayload,
      userId,
    );

    if (response.data) {
      return res.status(HttpStatus.OK).send(response);
    }

    return res.status(HttpStatus.BAD_REQUEST).send(response);
  }

  @Get('')
  async getGroceries(
    @Res() res: Response,
    @Query('page') page: number,
    @Query('pagesize') pagesize: number,
    @Req() req: Request,
  ): Promise<any> {
    const userId = req.headers['user-id'];
    this.logger.log(`inside getGroceries controller:: ${userId}`);

    if (!userId) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('Provide userId in headers');
    }
    const response: any = await this.groceryService.getGroceries(
      userId,
      page - 1,
      pagesize,
    );

    if (response.data) {
      return res.status(HttpStatus.OK).send(response);
    }

    return res.status(HttpStatus.BAD_REQUEST).send(response);
  }

  @Delete('')
  async deleteGrocery(
    @Res() res: Response,
    @Query('groceryId') groceryId: string,
    @Req() req: Request,
  ): Promise<any> {
    const userId = req.headers['user-id'];
    this.logger.log(`inside deleteGrocery controller:: ${userId}`);

    if (!userId) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('Provide userId in headers');
    }
    const response: any = await this.groceryService.deleteGrocery(
      userId,
      groceryId,
    );

    if (response.data) {
      return res.status(HttpStatus.OK).send(response);
    }

    return res.status(HttpStatus.BAD_REQUEST).send(response);
  }

  @Put('')
  async updateGrocery(
    @Res() res: Response,
    @Body() updatePayload: UpdateGroceryDto,
    @Query('groceryId') groceryId: string,
    @Req() req: Request,
  ): Promise<any> {
    const userId = req.headers['user-id'];
    this.logger.log(`inside updateGrocery controller:: ${userId}`);

    if (!userId) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('Provide userId in headers');
    }
    const response: any = await this.groceryService.updateGrocery(
      userId,
      updatePayload,
      groceryId
    );

    if (response.data) {
      return res.status(HttpStatus.OK).send(response);
    }

    return res.status(HttpStatus.BAD_REQUEST).send(response);
  }


  @Put('/inventory')
  async updateInventory(
    @Res() res: Response,
    @Query('quantity') quantity: string,
    @Query('groceryId') groceryId: string,
    @Req() req: Request,
  ): Promise<any> {
    const userId = req.headers['user-id'];
    this.logger.log(`inside updateInventory controller:: ${userId}`);

    if (!userId) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('Provide userId in headers');
    }
    const response: any = await this.groceryService.updateInventory(
      userId,
      quantity,
      groceryId
    );

    if (response.data) {
      return res.status(HttpStatus.OK).send(response);
    }

    return res.status(HttpStatus.BAD_REQUEST).send(response);
  }
}
