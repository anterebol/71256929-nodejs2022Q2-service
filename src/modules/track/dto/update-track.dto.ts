import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  duration: number;
  @IsString()
  @IsOptional()
  artistId?: string;
  @IsString()
  @IsOptional()
  albumId?: string;
}
