import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/output.dto';
import { DishOption } from 'src/restaurants/entities/dish.entity';
import { OrderItemOption } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';

@InputType()
class CreateOrderItemInput {
  @Field((type) => Int)
  dishId: number;

  @Field((type) => DishOption, { nullable: true })
  options?: DishOption[];
}
@InputType()
export class CreateOrderInput {
  @Field((type) => Int)
  restaurantId: number;

  @Field((type) => [OrderItemOption], { nullable: true })
  items?: OrderItemOption[];
}

@ObjectType()
export class CreateOrderOutput extends CommonOutput {}
