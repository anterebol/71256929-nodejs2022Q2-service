import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  artistId: string | null;

  toResponse() {
    const { id, name, year, artistId } = this;
    return { id, name, year, artistId };
  }
}
