import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NOT_FOUND } from './../../../constants/constants';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { checkUuid } from 'src/utils/uuid/uuid';
import { artistProperties } from '../interfere/artistInterfere';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entity/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}
  async getAll() {
    const res = await this.artistRepository.find();
    return res.map((artist) => artist.toResponse());
  }
  async getById(id: string) {
    checkUuid(id);
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (artist) return artist.toResponse();
    throw new HttpException(NOT_FOUND, 404);
  }
  async createArtist(body: CreateArtistDto) {
    const createdTrack = this.artistRepository.create(body);
    return (await this.artistRepository.save(createdTrack)).toResponse();
  }
  async updateArtist(body: UpdateArtistDto, id: string) {
    checkUuid(id);
    const track = await this.artistRepository.findOne({ where: { id } });
    if (track) {
      for (const key in artistProperties) {
        const changeKey = artistProperties[key];
        if (typeof body[changeKey] !== 'boolean') {
          track[changeKey] = body[changeKey] || track[changeKey];
        } else {
          track[changeKey] = body[changeKey];
        }
      }
      return await this.artistRepository.save(track);
    }
    throw new HttpException(NOT_FOUND, 404);
  }
  async removeArtist(id: string) {
    checkUuid(id);
    const result = await this.artistRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(NOT_FOUND, 404);
    }
  }
}
