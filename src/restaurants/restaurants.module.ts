import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { DishResolver } from './dish.resolver';
import { DishService } from './dish.service';
import { Dish } from './entities/dish.entity';
import { Restaurant } from './entities/restaurant.entity';
import { CategoryRepository } from './repositories/category.repository';
import { RestaurantsResolver } from './restaurants.resolver';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, Dish]),
    TypeOrmExModule.forCustomRepository([CategoryRepository]),
  ],
  providers: [
    RestaurantsService,
    RestaurantsResolver,
    CategoryService,
    CategoryResolver,
    DishService,
    DishResolver,
  ],
})
export class RestaurantsModule {}
