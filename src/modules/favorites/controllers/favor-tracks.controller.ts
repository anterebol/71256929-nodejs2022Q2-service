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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/authGuard/auth.guard';

@Controller('favs/track')
@UseGuards(JwtAuthGuard)
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
