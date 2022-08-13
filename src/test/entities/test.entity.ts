import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Test {
  @Field((type) => String)
  name: string;

  @Field((type) => Number, { nullable: true })
  age?: number;
}
