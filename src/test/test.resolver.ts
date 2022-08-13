import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTestDto } from './dtos/create-test.dto';
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

  @Mutation((returns) => Boolean)
  createTest2(@Args('input') createTestDto: CreateTestDto): boolean {
    return true;
  }
}
