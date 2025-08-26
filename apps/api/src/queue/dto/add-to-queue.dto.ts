import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class AddToQueueDto {
  @IsString()
  videoId: string;

  @IsBoolean()
  @IsOptional()
  isPriority?: boolean = false;
}