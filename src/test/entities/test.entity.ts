import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Test {
  @Field((type) => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(4, 10)
  name: string;

  @Field((type) => String)
  @Column()
  @IsEmail()
  email: string;

  @Field((type) => Number, { nullable: true })
  @Column()
  @IsNumber()
  age?: number;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => String, { nullable: true })
  @Column()
  @IsString()
  sex?: string;
}
