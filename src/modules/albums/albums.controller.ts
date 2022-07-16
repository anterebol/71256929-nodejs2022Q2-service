import { Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { db } from 'src/db/db';

@Controller('album')
export class AlbumsController {
  @Get()
  getAlbums() {
    return db;
  }
  @Get()
  getAlbum() {
    return db;
  }
  @Post()
  addAlbum() {
    return 'add album';
  }
  @Put()
  updateAlbum() {
    return 'update album';
  }
  @Delete()
  deleteAlbum() {
    return 'delete album';
  }
}
