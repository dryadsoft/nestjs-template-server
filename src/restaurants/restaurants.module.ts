import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { Restaurant } from './entities/restaurant.entity';
import { CategoryRepository } from './repositories/category.repository';
import { RestaurantsResolver } from './restaurants.resolver';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    TypeOrmExModule.forCustomRepository([CategoryRepository]),
  ],
  providers: [RestaurantsService, RestaurantsResolver],
})
export class RestaurantsModule {}
