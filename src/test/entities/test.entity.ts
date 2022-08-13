import { Field, ObjectType } from '@nestjs/graphql';
import { FilesInterceptor } from '@nestjs/platform-express';

@ObjectType()
export class Test {
  @Field((type) => String)
  name: string;

  @Field((type) => Number, { nullable: true })
  age?: number;

  @Field((type) => String)
  address: string;

  @Field((type) => String, { nullable: true })
  sex?: string;
}
