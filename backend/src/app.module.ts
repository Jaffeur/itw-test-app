import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { DishesController } from './modules/dishes/dishes.controller';
import { BasketController } from './modules/baskets/basket.controller';
import { IngredientController } from './modules/ingredients/ingredient.controller';
import { config } from './database/config';

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  controllers: [DishesController, BasketController, IngredientController],
})
export class AppModule {}
