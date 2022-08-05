import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from '../entity/track.entity';
import { Module, forwardRef } from '@nestjs/common';
import { TrackController } from '../controller/track.controller';
import { TrackService } from '../service/track.service';
import { AlbumEntity } from 'src/modules/albums/entity/album.entity';
import { ArtistEntity } from 'src/modules/artists/entity/artist.entity';
import { AuthModule } from 'src/modules/auth/module/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackEntity, AlbumEntity, ArtistEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
