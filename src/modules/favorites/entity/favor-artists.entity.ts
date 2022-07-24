import { PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('favs/artist')
export class FavoriteArtistsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
