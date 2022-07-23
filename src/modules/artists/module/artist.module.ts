import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from '../entity/artist.entity';
import { Module } from '@nestjs/common';
import { ArtistsController } from '../controller/artists.controller';
import { ArtistService } from '../service/artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistsController],
  providers: [ArtistService],
})
export class ArtistModule {}
