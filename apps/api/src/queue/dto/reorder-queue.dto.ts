import { IsNumber } from 'class-validator';

export class ReorderQueueDto {
  @IsNumber()
  fromIndex: number;

  @IsNumber()
  toIndex: number;
}