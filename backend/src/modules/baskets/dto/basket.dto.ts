import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsInt,
  IsNotIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class BasketParams {
  @IsUUID(4)
  id: string;
}

export class AddBasketDishDTO {
  @IsUUID(4)
  id: string;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsPositive()
  quantity: number;
}

export class DeleteBasketDishDTO {
  @IsUUID(4)
  id: string;
}
