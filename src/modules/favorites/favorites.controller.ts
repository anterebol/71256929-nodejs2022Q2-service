import { Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { db } from 'src/db/db';

@Controller('favs')
export class FavoritesController {
  @Get()
  getFavorites() {
    return db;
  }
  @Get()
  getFavorite() {
    return db;
  }
  @Post()
  addFavorite() {
    return 'add Artist';
  }
  @Put()
  updateFavorite() {
    return 'update Artist';
  }
  @Delete()
  deleteFavorite() {
    return 'delete Artist';
  }
}
