import { Injectable } from '@nestjs/common';
import { FAVORITES } from 'src/constants/constants';
import { searchElement } from 'src/utils/search/search';
import { checkUuid } from 'src/utils/uuid/uuid';
import { db } from 'src/db/db';
import { deleteFromFavorites } from 'src/utils/deleteFromFavorites/deleteFromFavorites';

@Injectable()
export class FavoritesService {
  getAll() {
    return db[FAVORITES];
  }
  addToFavorites(id, prop: string) {
    checkUuid(id);
    const element = searchElement(prop, id, 422);
    db[FAVORITES][prop].push(element);
    return element;
  }
  removeFromFavorites(id, prop: string) {
    checkUuid(id);
    deleteFromFavorites(prop, id);
  }
}
