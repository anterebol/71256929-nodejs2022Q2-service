import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  toResponse() {
    const { id, name, grammy } = this;
    return { id, name, grammy };
  }
}
