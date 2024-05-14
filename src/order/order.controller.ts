import { Body, Controller, HttpStatus, Logger, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  constructor(private readonly orderService: OrderService){}
  @Post()
  async createOrder(
    @Body() orderPayload,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = req.headers['user-id'];
    this.logger.log(`inside createOrder controller:: ${userId}`);

    if (!userId) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('Provide userId in headers');
    }
    const response: any = await this.orderService.createOrder(
      userId,
      orderPayload,
    );

    if (response.data) {
      return res.status(HttpStatus.OK).send(response);
    }

    return res.status(HttpStatus.BAD_REQUEST).send(response);
  }
}
