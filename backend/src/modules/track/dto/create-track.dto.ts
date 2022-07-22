import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  duration: number;
  @IsString()
  @IsOptional()
  artistId?: string;
  @IsString()
  @IsOptional()
  albumId?: string;
}
