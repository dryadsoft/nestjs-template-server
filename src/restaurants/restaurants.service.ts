import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createCipheriv } from 'crypto';
import { EditProfileOutput } from 'src/users/dtos/edit-profile.dto';
import { User } from 'src/users/entities/user.entity';
import { ILike, Like, Repository } from 'typeorm';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from './dtos/delete-restaurant.dto';
import { EditRestaurantInput } from './dtos/edit-restaurant.dto';
import { RestaurantInput, RestaurantOutput } from './dtos/restaurant.dto';
import { RestaurantsInput, RestaurantsOutput } from './dtos/restaurants.dto';
import {
  SearchRestaruantsOutput,
  SearchRestaurantsInput,
} from './dtos/search-restaurants.dto';
import { Category } from './entities/category.entity';
import { Restaurant } from './entities/restaurant.entity';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    private readonly categories: CategoryRepository,
  ) {}

  async createRestaurant(
    owner: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant = this.restaurants.create(createRestaurantInput);
      newRestaurant.owner = owner;
      const category = await this.categories.getOrCreate(
        createRestaurantInput.categoryName,
      );
      newRestaurant.category = category;
      await this.restaurants.save(newRestaurant);
      return {
        ok: true,
      };
    } catch (err) {
      return {
        ok: false,
        error: '레스토랑생성 실패',
      };
    }
  }

  async editRestaurant(
    owner: User,
    editRestaurantInput: EditRestaurantInput,
  ): Promise<EditProfileOutput> {
    try {
      const restaurant = await this.restaurants.findOne({
        where: { id: editRestaurantInput.restaurantId },
        loadRelationIds: true,
      });
      if (!restaurant) {
        return {
          ok: false,
          error: 'Restaurant not found!',
        };
      }

      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: '본인소유의 레스트랑만 수정할 수 있습니다.',
        };
      }
      let category: Category;
      if (editRestaurantInput.categoryName) {
        category = await this.categories.getOrCreate(
          editRestaurantInput.categoryName,
        );
      }
      await this.restaurants.save([
        {
          id: editRestaurantInput.restaurantId,
          ...editRestaurantInput,
          ...(category && { category }),
        },
      ]);
      return {
        ok: true,
      };
    } catch (err) {
      console.log(err);
      return {
        ok: false,
        error: '업데이트 실패',
      };
    }
  }

  async deleteRestaurant(
    owner: User,
    { restaurantId }: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOne({
        where: { id: restaurantId },
      });
      if (!restaurant) {
        return {
          ok: false,
          error: 'Restaurant not found!',
        };
      }

      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: '본인소유의 레스트랑만 삭제할 수 있습니다.',
        };
      }
      await this.restaurants.delete({ id: restaurantId });
      return {
        ok: true,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'can not delete restaurant',
      };
    }
  }

  async countRestaurant(category: Category): Promise<number> {
    return this.restaurants.count({
      where: {
        category: {
          id: category.id,
        },
      },
    });
  }

  async allRestaurants({ page }: RestaurantsInput): Promise<RestaurantsOutput> {
    try {
      const [restaurants, totalResults] = await this.restaurants.findAndCount({
        take: 25,
        skip: (page - 1) * 25,
      });
      return {
        ok: true,
        restaurants,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'Could not load restaurant',
      };
    }
  }

  async findRestaruantById({
    restaurantId,
  }: RestaurantInput): Promise<RestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOne({
        where: { id: restaurantId },
      });
      if (!restaurant) {
        return {
          ok: false,
          error: 'Restaurant not found',
        };
      }
      return {
        ok: true,
        restaurant,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'Could not find Restaurant',
      };
    }
  }
  async searchRestaurantsByName({
    keyword,
    page,
  }: SearchRestaurantsInput): Promise<SearchRestaruantsOutput> {
    try {
      const [restaurants, totalResults] = await this.restaurants.findAndCount({
        where: {
          name: ILike(`%${keyword}%`),
        },
        take: 25,
        skip: (page - 1) * 25,
      });
      return {
        ok: true,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
        restaurants,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'Could not found search restaurant',
      };
    }
  }
}
