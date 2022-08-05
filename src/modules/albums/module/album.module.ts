import { TrackEntity } from 'src/modules/track/entity/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../entity/album.entity';
import { Module, forwardRef } from '@nestjs/common';
import { AlbumsController } from '../controller/album.controller';
import { AlbumService } from '../service/album.service';
import { ArtistEntity } from 'src/modules/artists/entity/artist.entity';
import { FavoriteAlbumsEntity } from 'src/modules/favorites/entity/favor-albums.entyty';
import { AuthModule } from 'src/modules/auth/module/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlbumEntity,
      ArtistEntity,
      TrackEntity,
      FavoriteAlbumsEntity,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [AlbumsController],
  providers: [AlbumService],
})
export class AlbumModule {}
