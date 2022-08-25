import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDishInput, CreateDishOutput } from './dtos/create-dish.dto';
import { Dish } from './entities/dish.entity';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish) private readonly dishes: Repository<Dish>,
  ) {}

  async createDish(
    owner: User,
    createDishInput: CreateDishInput,
  ): Promise<CreateDishOutput> {
    try {
      // this.dishes.save(this.dishes)
      return {
        ok: true,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'Could not create Dish',
      };
    }
  }
}
