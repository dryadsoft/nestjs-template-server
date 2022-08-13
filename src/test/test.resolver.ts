import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTestDto, CreateTestDto2 } from './dtos/create-test.dto';
import { Test } from './entities/test.entity';
import { TestService } from './test.service';

@Resolver((of) => Test)
export class TestResolver {
  constructor(private readonly testService: TestService) {}
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

  @Mutation((returns) => Boolean)
  createTest3(@Args() createTestDto2: CreateTestDto2): boolean {
    return true;
  }

  @Query((returns) => [Test])
  getAll(): Promise<Test[]> {
    return this.testService.getAll();
  }
}
