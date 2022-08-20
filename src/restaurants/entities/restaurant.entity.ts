import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Column()
  @Field((type) => String)
  name: string;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  coverImg?: string;

  @Column()
  @Field((type) => String)
  address: string;

  @ManyToOne((type) => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Field((type) => Category, { nullable: true })
  category?: Category;

  @ManyToOne((type) => User, (user) => user.restaurants)
  @Field((type) => User)
  owner: User;
}
