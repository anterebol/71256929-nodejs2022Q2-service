import { JwtAuthGuard } from './../../auth/authGuard/auth.guard';
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
  UseGuards,
} from '@nestjs/common';

@Controller('album')
@UseGuards(JwtAuthGuard)
export class AlbumsController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async getAlbums() {
    return await this.albumService.getAll();
  }
  @Get(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async getAlbum(@Param('id') id: string) {
    return await this.albumService.getById(id);
  }
  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async addAlbum(@Body() body: CreateAlbumDto) {
    return await this.albumService.createAlbum(body);
  }
  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateAlbum(@Body() body: UpdateAlbumDto, @Param('id') id: string) {
    return await this.albumService.updateAlbum(body, id);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  async deleteAlbum(@Param('id') id: string) {
    return await this.albumService.removeAlbum(id);
  }
}
