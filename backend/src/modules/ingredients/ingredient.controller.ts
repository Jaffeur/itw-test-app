import { EntityManager } from '@mikro-orm/core';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { PgQueryErrorInterceptor } from '../interceptors';
import { IngredientEntity } from '../../database/entities';

@Controller('ingredients')
@UseInterceptors(PgQueryErrorInterceptor)
export class IngredientController {
  constructor(private readonly entityManager: EntityManager) {}

  @Get()
  async findAll() {
    const ingredients = await this.entityManager.find(IngredientEntity, {});
    return ingredients;
  }
}
