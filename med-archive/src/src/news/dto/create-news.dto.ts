import { IsString, IsOptional, IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  tags?: string[];
}

