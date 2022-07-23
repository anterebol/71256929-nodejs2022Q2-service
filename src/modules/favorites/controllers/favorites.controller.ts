import { FavoritesService } from '../services/favor.service';
import { Controller, Get, Header, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.favoritesService.getAll();
  }
}
