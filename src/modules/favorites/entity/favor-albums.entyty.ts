import { PrimaryColumn, Entity } from 'typeorm';

@Entity('favs/album')
export class FavoriteAlbumsEntity {
  @PrimaryColumn()
  id: string;
}
