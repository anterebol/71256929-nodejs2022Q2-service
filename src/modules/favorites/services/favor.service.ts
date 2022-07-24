import { ALBUMS, ARTISTS, NOT_FOUND, TRACKS } from 'src/constants/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { checkUuid } from 'src/utils/uuid/uuid';
import { ArtistEntity } from 'src/modules/artists/entity/artist.entity';
import { FavoriteAlbumsEntity } from '../entity/favor-albums.entyty';
import { FavoriteTracksEntity } from '../entity/favor-tracks.entity';
import { FavoriteArtistsEntity } from '../entity/favor-artists.entity';
import { AlbumEntity } from 'src/modules/albums/entity/album.entity';
import { TrackEntity } from 'src/modules/track/entity/track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteAlbumsEntity)
    private favoriteAlbumRepository: Repository<FavoriteAlbumsEntity>,
    @InjectRepository(FavoriteTracksEntity)
    private favoriteTrackRepository: Repository<FavoriteTracksEntity>,
    @InjectRepository(FavoriteArtistsEntity)
    private favoriteArtistRepository: Repository<FavoriteArtistsEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}
  async getAll() {
    const res = {
      artists: [],
      albums: [],
      tracks: [],
    };
    const albumsIds = await this.favoriteAlbumRepository.find();
    const artistIds = await this.favoriteArtistRepository.find();
    const trackIds = await this.favoriteTrackRepository.find();
    res.albums = await Promise.all(
      albumsIds.map(async (id) => {
        const album = await this.albumRepository.findOne({
          where: { id: id.id },
        });
        if (album) return album.toResponse();
      }),
    );
    res.artists = await Promise.all(
      artistIds.map(async (id) => {
        const artist = await this.artistRepository.findOne({
          where: { id: id.id },
        });
        if (artist) return artist.toResponse();
      }),
    );
    res.tracks = await Promise.all(
      trackIds.map(async (id) => {
        const track = await this.trackRepository.findOne({
          where: { id: id.id },
        });
        if (track) return track.toResponse();
      }),
    );
    res.tracks = res.tracks.filter((item) => {
      if (item) {
        return item;
      }
    });
    res.albums = res.albums.filter((item) => {
      if (item) {
        return item;
      }
    });
    res.artists = res.artists.filter((item) => {
      if (item) {
        return item;
      }
    });
    return res;
  }
  async addToFavorites(id, prop: string) {
    checkUuid(id);
    switch (prop) {
      case ALBUMS:
        const album = await this.albumRepository.findOne({ where: { id } });
        if (album) {
          await this.favoriteAlbumRepository.save({ id });
          return album;
        }
        throw new HttpException(NOT_FOUND, 404);
      case ARTISTS:
        const artist = await this.artistRepository.findOne({ where: { id } });
        if (artist) {
          await this.favoriteArtistRepository.save({ id });
          return artist;
        }
        throw new HttpException(NOT_FOUND, 404);
      case TRACKS:
        const track = await this.trackRepository.findOne({ where: { id } });
        if (track) {
          await this.favoriteTrackRepository.save({ id });
          return track;
        }
        throw new HttpException(NOT_FOUND, 404);
    }
  }
  async removeFromFavorites(id, prop: string) {
    checkUuid(id);
    switch (prop) {
      case ALBUMS:
        const albumDel = await this.favoriteAlbumRepository.delete(id);
        if (albumDel.affected === 0) {
          throw new HttpException(NOT_FOUND, 404);
        }
        break;
      case ARTISTS:
        const artistDel = await this.favoriteArtistRepository.delete(id);
        if (artistDel.affected === 0) {
          throw new HttpException(NOT_FOUND, 404);
        }
        break;
      case TRACKS:
        const trackDel = await this.favoriteTrackRepository.delete(id);
        if (trackDel.affected === 0) {
          throw new HttpException(NOT_FOUND, 404);
        }
        break;
    }
  }
}
