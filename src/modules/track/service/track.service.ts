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
import { AlbumEntity } from 'src/modules/albums/entity/album.entity';
import { ArtistEntity } from 'src/modules/artists/entity/artist.entity';
import { FavoriteTracksEntity } from 'src/modules/favorites/entity/favor-tracks.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(ArtistEntity)
    private favoriteTrackRepository: Repository<FavoriteTracksEntity>,
  ) {}
  async getAll() {
    const res = await this.trackRepository.find();
    return res.map((track) => track.toResponse());
  }
  async getById(id: string) {
    checkUuid(id);
    const track = await this.trackRepository.findOne({ where: { id: id } });
    if (track) {
      return track.toResponse();
    }
    throw new HttpException(NOT_FOUND, 404);
  }
  async createTrack(body: CreateTrackDto) {
    const track = createItemDB(body, trackProperties);
    if (!body.artistId) {
      body.artistId = null;
    }
    const isArtistCorrect = await this.artistRepository.findOne({
      where: { id: body.artistId },
    });
    if (!isArtistCorrect) {
      track.artistId = null;
    }
    if (!body.albumId) {
      body.albumId = null;
    }
    const isAlbumCorrect = await this.albumRepository.findOne({
      where: { id: body.albumId },
    });
    if (!isAlbumCorrect) {
      track.albumId = null;
    }
    const createdTrack = this.trackRepository.create(track);
    return await this.trackRepository.save(createdTrack);
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
    await this.favoriteTrackRepository.delete(id);
  }
}
