import { PrimaryColumn, Entity } from 'typeorm';

@Entity('favs/artist')
export class FavoriteArtistsEntity {
  @PrimaryColumn()
  id: string;
}
