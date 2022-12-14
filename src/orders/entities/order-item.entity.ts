import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import {
  Dish,
  DishChoice,
  DishOption,
} from 'src/restaurants/entities/dish.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('OrderItemOptionInputTypd', { isAbstract: true })
@ObjectType()
export class OrderItemOption {
  @Field((type) => String)
  name: string;
  @Field((type) => DishChoice, { nullable: true })
  choice?: DishChoice;
  @Field((type) => [Int], { nullable: true })
  extra?: number;
}

@InputType('OrderItemInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {
  @Field((type) => Dish)
  @ManyToOne((type) => Dish, { onDelete: 'CASCADE', nullable: true })
  dish?: Dish;

  @Field((tye) => [OrderItemOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: OrderItemOption[];
}
