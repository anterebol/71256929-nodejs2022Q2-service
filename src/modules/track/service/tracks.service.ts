import { CreateTrackDto } from './../dto/create-track.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { db } from 'src/db/db';
import { checkUuid } from 'src/uuid/uuid';
import { searchElement } from 'src/search/search';
import { TRACKS, NAME } from 'src/constants/constants';
import { updateDb } from 'src/updateDB/updateDb';
import { trackProperties } from '../interfere/trackInterfere';

@Injectable()
export class TracksService {
  getAll() {
    return db[TRACKS];
  }
  getById(id: string) {
    checkUuid(id);
    const track = searchElement(TRACKS, id);
    return track;
  }
  createTrack(body: CreateTrackDto) {
    if (!body[NAME]) {
      throw new HttpException('Введит имя', 400);
    }
    return updateDb(
      { id: undefined, changeProp: TRACKS },
      body,
      trackProperties,
    );
  }
  updateTrack(body: CreateTrackDto, id: string) {
    checkUuid(id);
    searchElement(TRACKS, id);
    return updateDb({ id, changeProp: TRACKS }, body, trackProperties);
  }
  removeTrack(id: string) {
    checkUuid(id);
    searchElement(TRACKS, id);
    const i = db[TRACKS].findIndex((track) => track.id === id);
    db[TRACKS].splice(i, 1);
    return 'deleted';
  }
}
