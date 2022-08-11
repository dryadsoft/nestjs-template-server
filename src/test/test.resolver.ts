import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TestResolver {
  @Query((returns) => Boolean)
  isGood(): boolean {
    return true;
  }
}
