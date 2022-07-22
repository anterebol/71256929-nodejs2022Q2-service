import { Module } from '@nestjs/common';
import { FavorTrackController } from '../controllers/favor-tracks.controller';
import { FavorAlbumController } from '../controllers/favor-albums.controller';
import { FavorArtistController } from '../controllers/favor-artists.controller';
import { FavoritesController } from '../controllers/favorites.controller';
import { FavoritesService } from '../services/favor.service';

@Module({
  controllers: [
    FavorTrackController,
    FavorArtistController,
    FavorAlbumController,
    FavoritesController,
  ],
  providers: [FavoritesService],
})
export class FavoritesModule {}
