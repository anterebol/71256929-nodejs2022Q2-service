import { TrackService } from '../service/track.service';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { CreateTrackDto } from '../dto/create-track.dto';
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

@Controller('track')
export class TrackController {
  constructor(private readonly tracksService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  getTracks() {
    return this.tracksService.getAll();
  }
  @Get(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  getTrack(@Param('id') id: string) {
    return this.tracksService.getById(id);
  }
  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  addTrack(@Body() body: CreateTrackDto) {
    return this.tracksService.createTrack(body);
  }
  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  updateTrack(@Body() body: UpdateTrackDto, @Param('id') id: string) {
    return this.tracksService.updateTrack(body, id);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  deleteTrack(@Param('id') id: string) {
    return this.tracksService.removeTrack(id);
  }
}
