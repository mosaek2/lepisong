import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdatePlaylistDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  name?: string;
}