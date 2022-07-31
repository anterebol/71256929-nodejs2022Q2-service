import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAlbumDto } from './../dto/update-album.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { checkUuid } from 'src/utils/uuid/uuid';
import { NOT_FOUND } from 'src/constants/constants';
import { albumProperties } from '../interfere/albumInterfere';
import { AlbumEntity } from '../entity/album.entity';
import { ArtistEntity } from 'src/modules/artists/entity/artist.entity';
import { TrackEntity } from 'src/modules/track/entity/track.entity';
import { FavoriteAlbumsEntity } from 'src/modules/favorites/entity/favor-albums.entyty';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(FavoriteAlbumsEntity)
    private favoriteAlbumRepository: Repository<FavoriteAlbumsEntity>,
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
    if (body.artistId) {
      const isArtistCorrect = await this.artistRepository.findOne({
        where: { id: body.artistId },
      });
      if (!isArtistCorrect) {
        body.artistId = null;
      }
    } else {
      body.artistId = null;
    }
    return await this.albumRepository.save(body);
  }
  async updateAlbum(body: UpdateAlbumDto, id: string) {
    checkUuid(id);
    const album = await this.albumRepository.findOne({ where: { id: id } });
    if (album) {
      for (const key in albumProperties) {
        const changeKey = albumProperties[key];
        if (typeof body[changeKey] !== 'boolean') {
          album[changeKey] = body[changeKey] || album[changeKey];
        } else {
          album[changeKey] = body[changeKey];
        }
      }
      const isArtistCorrect = await this.artistRepository.findOne({
        where: { id: album.artistId },
      });
      if (!isArtistCorrect) {
        album.artistId = null;
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
    await this.favoriteAlbumRepository.delete(id);
    const tracks = await this.trackRepository.find();
    const upTracks = tracks.filter((track) => track.albumId === id);
    await Promise.all(
      upTracks.map(async (track) => {
        const currentTrack = { ...track };
        currentTrack.albumId = null;
        await this.trackRepository.save(currentTrack);
      }),
    );
  }
}
