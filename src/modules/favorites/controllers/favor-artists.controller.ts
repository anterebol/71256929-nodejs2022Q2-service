import { FavoritesService } from '../services/favor.service';
import {
  Controller,
  Post,
  Delete,
  Param,
  HttpStatus,
  Header,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ARTISTS } from 'src/constants/constants';
import { JwtAuthGuard } from 'src/modules/auth/authGuard/auth.guard';

@Controller('favs/artist')
@UseGuards(JwtAuthGuard)
export class FavorArtistController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  addFavoriteArtist(@Param('id') id: string) {
    return this.favoritesService.addToFavorites(id, ARTISTS);
  }
  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteArtist(@Param('id') id: string) {
    return this.favoritesService.removeFromFavorites(id, ARTISTS);
  }
}
