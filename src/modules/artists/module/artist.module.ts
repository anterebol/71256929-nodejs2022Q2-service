import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from '../entity/artist.entity';
import { forwardRef, Module } from '@nestjs/common';
import { ArtistsController } from '../controller/artists.controller';
import { ArtistService } from '../service/artist.service';
import { FavoriteArtistsEntity } from 'src/modules/favorites/entity/favor-artists.entity';
import { AlbumEntity } from 'src/modules/albums/entity/album.entity';
import { TrackEntity } from 'src/modules/track/entity/track.entity';
import { AuthModule } from 'src/modules/auth/module/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArtistEntity,
      TrackEntity,
      AlbumEntity,
      FavoriteArtistsEntity,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ArtistsController],
  providers: [ArtistService],
})
export class ArtistModule {}
