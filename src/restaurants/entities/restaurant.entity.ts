import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Column()
  @Field((type) => String)
  name: string;

  @Column()
  @Field((type) => String)
  coverImg: string;

  @Column()
  @Field((type) => String)
  address: string;

  @ManyToOne((type) => Category, (category) => category.restaurants)
  @Field((type) => Category)
  category: Category;
}
