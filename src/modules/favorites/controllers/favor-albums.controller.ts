import {
  Controller,
  Post,
  Delete,
  Param,
  Header,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from '../services/favor.service';
import { ALBUMS } from 'src/constants/constants';

@Controller('favs/album')
export class FavorAlbumController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  addFavoriteAlbum(@Param('id') id: string) {
    return this.favoritesService.addToFavorites(id, ALBUMS);
  }
  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteAlbum(@Param('id') id: string) {
    return this.favoritesService.removeFromFavorites(id, ALBUMS);
  }
}
