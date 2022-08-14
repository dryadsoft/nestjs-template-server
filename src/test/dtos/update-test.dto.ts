import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTestDto4 } from './create-test.dto';

@InputType()
export class UpdateTestInputType extends PartialType(CreateTestDto4) {}

@InputType()
export class UpdateTestDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateTestInputType)
  data: UpdateTestInputType;
}
