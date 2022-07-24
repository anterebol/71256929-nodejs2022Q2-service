import { PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('favs/album')
export class FavoriteAlbumsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
