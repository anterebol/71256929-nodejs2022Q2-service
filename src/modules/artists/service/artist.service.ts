import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NOT_FOUND } from './../../../constants/constants';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { checkUuid } from 'src/utils/uuid/uuid';
import { artistProperties } from '../interfere/artistInterfere';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entity/artist.entity';
import { FavoriteArtistsEntity } from 'src/modules/favorites/entity/favor-artists.entity';
import { AlbumEntity } from 'src/modules/albums/entity/album.entity';
import { TrackEntity } from 'src/modules/track/entity/track.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(FavoriteArtistsEntity)
    private favoriteArtistRepository: Repository<FavoriteArtistsEntity>,
  ) {}
  async getAll() {
    const res = await this.artistRepository.find();
    return res.map((artist) => artist.toResponse());
  }
  async getById(id: string) {
    checkUuid(id);
    const artist = await this.artistRepository.findOne({ where: { id: id } });
    if (artist) return artist.toResponse();
    throw new HttpException(NOT_FOUND, 404);
  }
  async createArtist(body: CreateArtistDto) {
    const createdArtist = this.artistRepository.create(body);
    return (await this.artistRepository.save(createdArtist)).toResponse();
  }
  async updateArtist(body: UpdateArtistDto, id: string) {
    checkUuid(id);
    const track = await this.artistRepository.findOne({ where: { id: id } });
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
    await this.favoriteArtistRepository.delete(id);
    const albums = await this.albumRepository.find();
    const upAlbums = albums.filter((album) => album.artistId === id);
    await Promise.all(
      upAlbums.map(async (album) => {
        const currentAlbum = { ...album };
        currentAlbum.artistId = null;
        await this.albumRepository.save(currentAlbum);
      }),
    );
    const tracks = await this.trackRepository.find();
    const upTracks = tracks.filter((track) => track.artistId === id);
    await Promise.all(
      upTracks.map(async (track) => {
        const currentTrack = { ...track };
        currentTrack.artistId = null;
        await this.trackRepository.save(currentTrack);
      }),
    );
  }
}
