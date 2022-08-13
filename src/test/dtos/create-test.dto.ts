import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsBoolean, isBoolean, IsString, Length } from 'class-validator';

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

@ArgsType()
export class CreateTestDto2 {
  @Field((type) => String)
  @IsString()
  @Length(4)
  name: string;

  @Field((type) => Number)
  age: number;
  @Field((type) => String)
  address: string;
  @Field((type) => Boolean)
  @IsBoolean()
  sex: boolean;
}
