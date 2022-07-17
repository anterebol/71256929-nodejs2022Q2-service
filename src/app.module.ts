import { UserService } from './modules/user/service/user.service';
import { Module } from '@nestjs/common';
import { UserController } from './modules/user/controller/user.controller';
import { TrackController } from './modules/track/controller/track.controller';
import { AlbumsController } from './modules/albums/albums.controller';
import { ArtistsController } from './modules/artists/controller/artists.controller';
import { FavoritesController } from './modules/favorites/favorites.controller';
import { TracksService } from './modules/track/service/tracks.service';
import { ArtistService } from './modules/artists/service/artist.service';

@Module({
  imports: [],
  controllers: [
    UserController,
    TrackController,
    AlbumsController,
    ArtistsController,
    FavoritesController,
  ],
  providers: [TracksService, ArtistService, UserService],
})
export class AppModule {}
