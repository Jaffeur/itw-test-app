import { EntityManager } from '@mikro-orm/core';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';

import { BasketEntity, BasketDishEntity, DishEntity } from '../../database/entities';

import { AddBasketDishDTO, BasketParams, DeleteBasketDishDTO } from './dto/basket.dto';
import { PgQueryErrorInterceptor } from '../interceptors';

@Controller('baskets')
@UseInterceptors(PgQueryErrorInterceptor)
export class BasketController {
  constructor(private readonly entityManager: EntityManager) {}

  @Get('current')
  async getCurrentNonPayed() {
    const currentBasket = await this.entityManager.findOne(BasketEntity, { payed: false });

    if (currentBasket === null) {
      return await this.entityManager.transactional(async (em) => {
        em.persist([new BasketEntity({})]);
      });
    }

    const basketDishes = await this.entityManager.find(
      BasketDishEntity,
      {
        basket: { id: currentBasket.id },
      },
      { populate: ['dish'] },
    );

    return {
      ...currentBasket,
      dishes: basketDishes.map((basketDish) => basketDish.dish),
    };
  }

  @Get(':id')
  async findOne(@Param() { id }: BasketParams) {
    const basket = await this.entityManager.findOne(BasketEntity, { id });

    // Dish with given id not found.
    if (basket === null) {
      return null;
    }

    const basketDishes = await this.entityManager.find(
      BasketDishEntity,
      {
        basket: { id },
      },
      { populate: ['dish'] },
    );

    return {
      ...basket,
      dishes: basketDishes.map((basketDish) => basketDish.dish),
    };
  }

  /**
   * Adding a dish to the current basket
   * @param param0 Uuid of a dish object
   * @returns 201 Http response
   */
  @HttpCode(201)
  @Post('current/dishes')
  async addDish(@Body() body: AddBasketDishDTO) {
    // Get the current basket
    const basket = await this.entityManager.findOne(BasketEntity, { payed: false });

    // Get the dish object matching the given id
    const dish = await this.entityManager.findOne(DishEntity, { id: body.id });

    // Get the quantity of dish
    const quantity = body.quantity;

    // Get existing dishes within the basket
    const existing_dishes = await this.entityManager.find(
      BasketDishEntity,
      { basket: basket.id },
      { populate: ['dish'] },
    );

    // Attach dish to the current basket by adding row in the basket_dish bridge table
    const basket_dish = new BasketDishEntity({ basket, dish });
    basket_dish.quantity = quantity;

    // Add new dish to existing dishes and then persist them
    existing_dishes.push(basket_dish);
    await this.entityManager.persistAndFlush(existing_dishes);

    // Return the current basket along with its selected dishes
    return {
      ...basket,
      dishes: existing_dishes.map((basket_dish) => ({
        dish: basket_dish.dish,
        quantity: basket_dish.quantity,
      })),
    };
  }

  /**
   * Adding a dish to the current basket
   * @param param0 Uuid of a dish object
   * @returns 201 Http response
   */
  @Delete('current/dishes')
  async deleteDish(@Body() body: DeleteBasketDishDTO) {
    // Get the current basket
    const basket = await this.entityManager.findOne(BasketEntity, { payed: false });

    // Get the dish object matching the given id
    const dish = await this.entityManager.findOne(DishEntity, { id: body.id });

    // Get existing dishes
    const basket_dish = await this.entityManager.find(BasketDishEntity, {
      basket: basket.id,
      dish: dish.id,
    });

    // Remove the dish from the basket by removing the basket_dish item from database
    await this.entityManager.removeAndFlush(basket_dish);

    // Get existing dishes
    const existing_dishes = await this.entityManager.find(
      BasketDishEntity,
      { basket: basket.id },
      { populate: ['dish'] },
    );

    // Return the current basket along with its selected dishes
    return {
      ...basket,
      dishes: existing_dishes.map((basket_dish) => ({
        dish: basket_dish.dish,
        quantity: basket_dish.quantity,
      })),
    };
  }
}
