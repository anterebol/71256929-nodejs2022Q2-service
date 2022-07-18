import { UserService } from './modules/user/service/user.service';
import { Module } from '@nestjs/common';
import { UserController } from './modules/user/controller/user.controller';
import { TrackController } from './modules/track/controller/track.controller';
import { AlbumsController } from './modules/albums/controller/albums.controller';
import { ArtistsController } from './modules/artists/controller/artists.controller';
import { TracksService } from './modules/track/service/tracks.service';
import { ArtistService } from './modules/artists/service/artist.service';
import { AlbumService } from './modules/albums/service/album.service';
import { FavoritesModule } from './modules/favorites/module/favorites.module';
@Module({
  imports: [FavoritesModule],
  controllers: [
    UserController,
    TrackController,
    AlbumsController,
    ArtistsController,
  ],
  providers: [TracksService, ArtistService, UserService, AlbumService],
})
export class AppModule {}
