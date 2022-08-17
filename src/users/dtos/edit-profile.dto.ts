import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@ObjectType()
export class EditProfileOutput extends CommonOutput {}

@InputType()
export class EditProfileinput extends PartialType(
  PickType(User, ['email', 'password']),
) {}
