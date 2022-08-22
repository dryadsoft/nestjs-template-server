import { Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { Category } from './entities/category.entity';
import { RestaurantsService } from './restaurants.service';

@Resolver((of) => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}
  @Query((returns) => AllCategoriesOutput)
  category(): Promise<AllCategoriesOutput> {
    return this.categoryService.allCategories();
  }
}
