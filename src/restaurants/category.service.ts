import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';
import { Restaurant } from './entities/restaurant.entity';
import { CategoryRepository } from './repositories/category.repository';
import { RestaurantsService } from './restaurants.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categories: CategoryRepository,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    private readonly restaurantsService: RestaurantsService,
  ) {}
  async allCategories(): Promise<AllCategoriesOutput> {
    try {
      const categories = await this.categories.find();
      return { ok: true, categories };
    } catch (err) {
      return { ok: false, error: 'Could not load categories' };
    }
  }

  async findCategoryBySlug({
    slug,
    page,
  }: CategoryInput): Promise<CategoryOutput> {
    try {
      const category = await this.categories.findOne({
        where: { slug },
      });
      if (!category) {
        return {
          ok: false,
          error: 'Category not found',
        };
      }
      const restaurants = await this.restaurants.find({
        where: { category: { id: category.id } },
        take: 25,
        skip: (page - 1) * 25,
      });
      category.restaurants = restaurants;
      const totalPages = await this.restaurantsService.countRestaurant(
        category,
      );
      return {
        ok: true,
        category,
        totalPages: Math.ceil(totalPages / 25),
      };
    } catch (err) {
      return {
        ok: false,
        error: 'Could not load category',
      };
    }
  }
}
