import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAlbumDto } from './../dto/update-album.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { checkUuid } from 'src/utils/uuid/uuid';
import { NOT_FOUND } from 'src/constants/constants';
import { albumProperties } from '../interfere/albumInterfere';
import { AlbumEntity } from '../entity/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}
  async getAll() {
    const res = await this.albumRepository.find();
    return res.map((album) => album.toResponse());
  }
  async getById(id: string) {
    checkUuid(id);
    const album = await this.albumRepository.findOne({ where: { id } });
    if (album) return album.toResponse();
    throw new HttpException(NOT_FOUND, 404);
  }
  async createAlbum(body: CreateAlbumDto) {
    const createdAlbum = this.albumRepository.create(body);
    return (await this.albumRepository.save(createdAlbum)).toResponse();
  }
  async updateAlbum(body: UpdateAlbumDto, id: string) {
    checkUuid(id);
    const album = await this.albumRepository.findOne({ where: { id } });
    if (album) {
      for (const key in albumProperties) {
        const changeKey = albumProperties[key];
        if (typeof body[changeKey] !== 'boolean') {
          album[changeKey] = body[changeKey] || album[changeKey];
        } else {
          album[changeKey] = body[changeKey];
        }
      }
      return await this.albumRepository.save(album);
    }
    throw new HttpException(NOT_FOUND, 404);
  }
  async removeAlbum(id: string) {
    checkUuid(id);
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(NOT_FOUND, 404);
    }
  }
}
