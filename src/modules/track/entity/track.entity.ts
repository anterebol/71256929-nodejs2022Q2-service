import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  artistId: string | null;

  @Column()
  albumId: string | null;

  @Column()
  duration: number;

  toResponse() {
    const { id, name, artistId, albumId, duration } = this;
    return { id, name, artistId, albumId, duration };
  }
}
