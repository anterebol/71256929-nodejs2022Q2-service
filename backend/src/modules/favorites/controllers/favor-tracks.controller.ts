import { TRACKS } from 'src/constants/constants';
import { FavoritesService } from '../services/favor.service';
import {
  Controller,
  Post,
  Delete,
  Param,
  Header,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

@Controller('favs/track')
export class FavorTrackController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  addFavoriteTrack(@Param('id') id: string) {
    return this.favoritesService.addToFavorites(id, TRACKS);
  }
  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteTrack(@Param('id') id: string) {
    return this.favoritesService.removeFromFavorites(id, TRACKS);
  }
}
