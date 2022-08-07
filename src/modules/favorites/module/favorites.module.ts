import { ArtistEntity } from './../../artists/entity/artist.entity';
import { TrackEntity } from 'src/modules/track/entity/track.entity';
import { AlbumEntity } from 'src/modules/albums/entity/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { FavorTrackController } from '../controllers/favor-tracks.controller';
import { FavorAlbumController } from '../controllers/favor-albums.controller';
import { FavorArtistController } from '../controllers/favor-artists.controller';
import { FavoritesController } from '../controllers/favorites.controller';
import { FavoritesService } from '../services/favor.service';
import { FavoriteAlbumsEntity } from '../entity/favor-albums.entyty';
import { FavoriteArtistsEntity } from '../entity/favor-artists.entity';
import { FavoriteTracksEntity } from '../entity/favor-tracks.entity';
import { AuthModule } from 'src/modules/auth/module/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoriteAlbumsEntity,
      ArtistEntity,
      FavoriteArtistsEntity,
      FavoriteTracksEntity,
      TrackEntity,
      AlbumEntity,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [
    FavorTrackController,
    FavorArtistController,
    FavorAlbumController,
    FavoritesController,
  ],
  providers: [FavoritesService],
})
export class FavoritesModule {}
