import { TrackEntity } from 'src/modules/track/entity/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../entity/album.entity';
import { Module } from '@nestjs/common';
import { AlbumsController } from '../controller/album.controller';
import { AlbumService } from '../service/album.service';
import { ArtistEntity } from 'src/modules/artists/entity/artist.entity';
import { FavoriteAlbumsEntity } from 'src/modules/favorites/entity/favor-albums.entyty';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlbumEntity,
      ArtistEntity,
      TrackEntity,
      FavoriteAlbumsEntity,
    ]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumService],
})
export class AlbumModule {}
