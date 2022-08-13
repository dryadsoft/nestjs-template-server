import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTestDto {
  @Field((type) => String)
  name: string;
  @Field((type) => Number)
  age: number;
  @Field((type) => String)
  address: string;
  @Field((type) => Boolean)
  sex: boolean;
}
