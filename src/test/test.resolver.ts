import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Test } from './entities/test.entity';

@Resolver((of) => Test)
export class TestResolver {
  @Query((returns) => [Test])
  myTest(@Args('sex') sex: string): Test[] {
    return [];
  }

  @Mutation((returns) => Boolean)
  createTest(
    @Args('name') name: string,
    @Args('age') age: number,
    @Args('address') address: string,
    @Args('sex') sex: boolean,
  ): boolean {
    return true;
  }
}
