import { ArtistService } from './../service/artist.service';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { CreateArtistDto } from '../dto/create-artist.dto';
import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Header,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  getArtists() {
    return this.artistService.getAll();
  }
  @Get(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  getArtist(@Param('id') id: string) {
    return this.artistService.getById(id);
  }
  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  addArtist(@Body() body: CreateArtistDto) {
    return this.artistService.createArtist(body);
  }
  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  updateArtist(@Body() body: UpdateArtistDto, @Param('id') id: string) {
    return this.artistService.updateArtist(body, id);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  deleteArtist(@Param('id') id: string) {
    return this.artistService.removeArtist(id);
  }
}
