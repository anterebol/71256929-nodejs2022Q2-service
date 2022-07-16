import { CreateArtistDto } from '../dto/create-artist.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { db } from 'src/db/db';
import { checkUuid } from 'src/uuid/uuid';
import { searchElement } from 'src/search/search';
import { ARTISTS } from 'src/constants/constants';
import { updateDb } from 'src/updateDB/updateDb';
import { artistProperties } from '../interfere/artistInterfere';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class ArtistService {
  getAll() {
    return db.artists;
  }
  getById(id: string) {
    checkUuid(id);
    const artist = searchElement(ARTISTS, id);
    return artist;
  }
  createArtist(body: CreateArtistDto) {
    if (!body.name) {
      throw new HttpException('Введит имя', 400);
    }
    return updateDb(
      { id: undefined, changeProp: ARTISTS },
      body,
      artistProperties,
    );
  }
  updateArtist(body: UpdateArtistDto, id: string) {
    checkUuid(id);
    searchElement(ARTISTS, id);
    return updateDb({ id, changeProp: ARTISTS }, body, artistProperties);
  }
  removeArtist(id: string) {
    checkUuid(id);
    searchElement(ARTISTS, id);
    const i = db[ARTISTS].findIndex((track) => track.id === id);
    db[ARTISTS].splice(i, 1);
    return 'deleted';
  }
}
