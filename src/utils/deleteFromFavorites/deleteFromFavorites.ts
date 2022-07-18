import { db } from 'src/db/db';
import {
  FAVORITES,
  NOT_FOUND,
  ARTISTS,
  TRACKS,
  ALBUMS,
} from 'src/constants/constants';
import { HttpException } from '@nestjs/common';

export function deleteFromFavorites(prop: string, id: string) {
  const i = db[FAVORITES][prop].findIndex((element) => element.id === id);
  if (i >= 0) {
    db[FAVORITES][prop].splice(i, 1);
    return 'deleted';
  } else if (prop === TRACKS || prop === ALBUMS || prop === ARTISTS) {
    return;
  } else {
    throw new HttpException(NOT_FOUND, 404);
  }
}
