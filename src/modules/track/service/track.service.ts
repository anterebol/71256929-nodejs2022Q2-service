import { createItemDB } from './../../../utils/updateDB/updateDb';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { CreateTrackDto } from '../dto/create-track.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { checkUuid } from 'src/utils/uuid/uuid';
import { NOT_FOUND } from 'src/constants/constants';
import { trackProperties } from '../interfere/trackInterfere';
import { TrackEntity } from '../entity/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}
  async getAll() {
    const res = await this.trackRepository.find();
    return res.map((track) => track.toResponse());
  }
  async getById(id: string) {
    checkUuid(id);
    const track = await this.trackRepository.findOne({ where: { id } });
    if (track) return track.toResponse();
    throw new HttpException(NOT_FOUND, 404);
  }
  async createTrack(body: CreateTrackDto) {
    const track = createItemDB(body, trackProperties);
    const createdTrack = this.trackRepository.create(track);
    return (await this.trackRepository.save(createdTrack)).toResponse();
  }
  async updateTrack(body: UpdateTrackDto, id: string) {
    checkUuid(id);
    const track = await this.trackRepository.findOne({ where: { id } });
    if (track) {
      for (const key in trackProperties) {
        const changeKey = trackProperties[key];
        if (typeof body[changeKey] !== 'boolean') {
          track[changeKey] = body[changeKey] || track[changeKey];
        } else {
          track[changeKey] = body[changeKey];
        }
      }
      return await this.trackRepository.save(track);
    }
    throw new HttpException(NOT_FOUND, 404);
  }
  async removeTrack(id: string) {
    checkUuid(id);
    // deleteFromFavorites(TRACKS, id);
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(NOT_FOUND, 404);
    }
  }
}
