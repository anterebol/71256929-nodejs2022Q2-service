import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../entity/album.entity';
import { Module } from '@nestjs/common';
import { AlbumsController } from '../controller/album.controller';
import { AlbumService } from '../service/album.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumsController],
  providers: [AlbumService],
})
export class AlbumModule {}
