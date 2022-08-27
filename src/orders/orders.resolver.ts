import { Resolver } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { OrderService } from './odrers.service';

@Resolver((of) => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}
}
