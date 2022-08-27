import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/output.dto';
import { DishOption } from 'src/restaurants/entities/dish.entity';
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

  @Field((type) => [CreateOrderItemInput], { nullable: true })
  items?: CreateOrderItemInput[];
}

@ObjectType()
export class CreateOrderOutput extends CommonOutput {}
