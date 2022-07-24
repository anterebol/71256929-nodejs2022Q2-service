import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  artistId: string | null;

  @Column({
    nullable: true,
  })
  albumId: string | null;

  @Column()
  duration: number;

  toResponse() {
    const { id, name, artistId, albumId, duration } = this;
    return { id, name, artistId, albumId, duration };
  }
}
