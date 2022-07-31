import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from '../entity/artist.entity';
import { Module } from '@nestjs/common';
import { ArtistsController } from '../controller/artists.controller';
import { ArtistService } from '../service/artist.service';
import { FavoriteArtistsEntity } from 'src/modules/favorites/entity/favor-artists.entity';
import { AlbumEntity } from 'src/modules/albums/entity/album.entity';
import { TrackEntity } from 'src/modules/track/entity/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArtistEntity,
      TrackEntity,
      AlbumEntity,
      FavoriteArtistsEntity,
    ]),
  ],
  controllers: [ArtistsController],
  providers: [ArtistService],
})
export class ArtistModule {}
