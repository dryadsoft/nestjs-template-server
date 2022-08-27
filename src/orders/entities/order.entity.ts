import {
  Field,
  Float,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  Pending = 'Pending',
  Cooking = 'Cooking',
  PickedUp = 'PickedUp',
  Delivered = 'Delivered',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@InputType('OrderInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Order extends CoreEntity {
  @ManyToOne((type) => User, (user) => user.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @Field((type) => User, { nullable: true })
  customer?: User;

  @ManyToOne((type) => User, (user) => user.rider, { nullable: true })
  @Field((type) => User, { nullable: true })
  driver?: User;

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Field((type) => Restaurant, { nullable: true })
  restaurant?: Restaurant;

  @ManyToMany((type) => OrderItem)
  @JoinTable()
  @Field((type) => [OrderItem])
  items: OrderItem[];

  @Column({ nullable: true })
  @Field((type) => Float, { nullable: true })
  @IsNumber()
  total?: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  @Field((type) => OrderStatus, { defaultValue: OrderStatus.Pending })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
