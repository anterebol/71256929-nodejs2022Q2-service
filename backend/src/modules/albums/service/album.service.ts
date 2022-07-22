import { UpdateAlbumDto } from './../dto/update-album.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { Injectable } from '@nestjs/common';
import { db } from 'src/db/db';
import { checkUuid } from 'src/utils/uuid/uuid';
import { searchElement } from 'src/utils/search/search';
import { ALBUMS, TRACKS, ALBUMID } from 'src/constants/constants';
import { updateDb } from 'src/utils/updateDB/updateDb';
import { albumProperties } from '../interfere/albumInterfere';
import { deleteFromFavorites } from 'src/utils/deleteFromFavorites/deleteFromFavorites';

@Injectable()
export class AlbumService {
  getAll() {
    return db[ALBUMS];
  }
  getById(id: string) {
    checkUuid(id);
    const track = searchElement(ALBUMS, id);
    return track;
  }
  createAlbum(body: CreateAlbumDto) {
    return updateDb(
      { id: undefined, changeProp: ALBUMS },
      body,
      albumProperties,
    );
  }
  updateAlbum(body: UpdateAlbumDto, id: string) {
    checkUuid(id);
    searchElement(ALBUMS, id);
    return updateDb({ id, changeProp: ALBUMS }, body, albumProperties);
  }
  removeAlbum(id: string) {
    checkUuid(id);
    searchElement(ALBUMS, id);
    const i = db[ALBUMS].findIndex((album) => album.id === id);
    db[ALBUMS].splice(i, 1);
    db[TRACKS] = db[TRACKS].map((item) => {
      if (item[ALBUMID] === id) {
        item[ALBUMID] = null;
      }
      return item;
    });
    deleteFromFavorites(ALBUMS, id);
    return 'deleted';
  }
}
