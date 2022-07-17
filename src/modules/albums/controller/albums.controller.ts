import { AlbumService } from '../service/album.service';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';
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

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  getAlbums() {
    return this.albumService.getAll();
  }
  @Get(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  getAlbum(@Param('id') id: string) {
    return this.albumService.getById(id);
  }
  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  addAlbum(@Body() body: CreateAlbumDto) {
    return this.albumService.createAlbum(body);
  }
  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  updateAlbum(@Body() body: UpdateAlbumDto, @Param('id') id: string) {
    return this.albumService.updateAlbum(body, id);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  deleteAlbum(@Param('id') id: string) {
    return this.albumService.removeAlbum(id);
  }
}
