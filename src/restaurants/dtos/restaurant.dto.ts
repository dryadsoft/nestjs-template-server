import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class RestaurantInput {
  @Field((type) => Number)
  restaurantId: number;
}

@ObjectType()
export class RestaurantOutput extends CommonOutput {
  @Field((type) => Restaurant, { nullable: true })
  restaurant?: Restaurant;
}
