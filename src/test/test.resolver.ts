import { Query, Resolver } from '@nestjs/graphql';
import { Test } from './entities/test.entity';

@Resolver((of) => Test)
export class TestResolver {
  @Query((returns) => [Test])
  myTest(): Test[] {
    return [];
  }
}
