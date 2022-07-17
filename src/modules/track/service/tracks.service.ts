import { UpdateTrackDto } from './../dto/update-track.dto';
import { CreateTrackDto } from './../dto/create-track.dto';
import { Injectable } from '@nestjs/common';
import { db } from 'src/db/db';
import { checkUuid } from 'src/utils/uuid/uuid';
import { searchElement } from 'src/utils/search/search';
import { TRACKS } from 'src/constants/constants';
import { updateDb } from 'src/utils/updateDB/updateDb';
import { trackProperties } from '../interfere/trackInterfere';
import { deleteFromFavorites } from 'src/utils/deleteFromFavorites/deleteFromFavorites';

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
    return updateDb(
      { id: undefined, changeProp: TRACKS },
      body,
      trackProperties,
    );
  }
  updateTrack(body: UpdateTrackDto, id: string) {
    checkUuid(id);
    searchElement(TRACKS, id);
    return updateDb({ id, changeProp: TRACKS }, body, trackProperties);
  }
  removeTrack(id: string) {
    checkUuid(id);
    searchElement(TRACKS, id);
    const i = db[TRACKS].findIndex((track) => track.id === id);
    db[TRACKS].splice(i, 1);
    deleteFromFavorites(TRACKS, id);
    return 'deleted';
  }
}
