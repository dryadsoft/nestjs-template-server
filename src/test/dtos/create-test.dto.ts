import { ArgsType, Field, InputType, OmitType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';
import { Test } from '../entities/test.entity';

@InputType()
export class CreateTestDto {
  @Field((type) => String)
  name: string;
  @Field((type) => Number)
  age: number;
  @Field((type) => String)
  address: string;
  @Field((type) => String)
  sex: string;
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
  @Field((type) => String)
  @IsString()
  sex: string;
}

@InputType()
export class CreateTestDto4 extends OmitType(Test, ['id']) {}
