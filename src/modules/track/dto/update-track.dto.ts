import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsOptional()
  artistId?: string | null;
  @IsString()
  @IsOptional()
  albumId?: string | null;
  @IsString()
  @IsOptional()
  duration?: number | null;
}
