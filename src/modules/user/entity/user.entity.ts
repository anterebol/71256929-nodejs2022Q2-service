import { PrimaryColumn, Entity, Column } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    return { id, login, version, createdAt, updatedAt };
  }
}
