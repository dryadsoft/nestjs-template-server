import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/output.dto';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class SearchRestaurantsInput extends PaginationInput {
  @Field((type) => String)
  keyword: string;
}

@ObjectType()
export class SearchRestaruantsOutput extends PaginationOutput {
  @Field((type) => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];
}
