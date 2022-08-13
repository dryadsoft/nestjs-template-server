import { Field, ObjectType } from '@nestjs/graphql';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Test {
  @Field((type) => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column()
  name: string;

  @Field((type) => Number, { nullable: true })
  @Column()
  age?: number;

  @Field((type) => String)
  @Column()
  address: string;

  @Field((type) => String, { nullable: true })
  @Column()
  sex?: string;
}
