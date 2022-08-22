import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';
import { Category } from './entities/category.entity';
import { RestaurantsService } from './restaurants.service';

@Resolver((of) => Category)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly restaurantsService: RestaurantsService,
  ) {}

  @ResolveField((type) => Int)
  restaurantCount(@Parent() category: Category): Promise<number> {
    return this.restaurantsService.countRestaurant(category);
  }
  @Query((returns) => AllCategoriesOutput)
  AllCategories(): Promise<AllCategoriesOutput> {
    return this.categoryService.allCategories();
  }

  @Query((returns) => CategoryOutput)
  category(@Args() categoryInput: CategoryInput): Promise<CategoryOutput> {
    return this.categoryService.findCategoryBySlug(categoryInput);
  }
}
