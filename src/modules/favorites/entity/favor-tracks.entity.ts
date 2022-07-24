import { PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('favs/track')
export class FavoriteTracksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
