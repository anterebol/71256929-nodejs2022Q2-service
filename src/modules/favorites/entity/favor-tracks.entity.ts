import { PrimaryColumn, Entity } from 'typeorm';

@Entity('favs/track')
export class FavoriteTracksEntity {
  @PrimaryColumn()
  id: string;
}
