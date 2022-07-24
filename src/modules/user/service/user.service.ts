import { CreateUserDto } from '../dto/create-user.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { checkUuid } from 'src/utils/uuid/uuid';
import { UNCORRECT_OLD_PASSWORD, NOT_FOUND } from 'src/constants/constants';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async getAll() {
    const res = await this.userRepository.find();
    return res.map((user) => user.toResponse());
  }
  async getById(id: string) {
    checkUuid(id);
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) return user.toResponse();
    throw new HttpException(NOT_FOUND, 404);
  }
  async createUser(body: CreateUserDto) {
    const { password, login } = body;
    const id = uuidv4();
    const createdAt = new Date().getTime();
    const updatedAt = new Date().getTime();
    const user = {
      id,
      login,
      password,
      version: 1,
      createdAt: createdAt.toString(),
      updatedAt: updatedAt.toString(),
    };
    const res = {
      id,
      login,
      version: 1,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };
    const createdUser = this.userRepository.create(user);
    await this.userRepository.save(createdUser);
    return res;
  }
  async updateUser(body: UpdatePasswordDto, id: string) {
    checkUuid(id);
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(NOT_FOUND, 404);
    }
    const { oldPassword, newPassword } = body;
    if (user.password === oldPassword) {
      user.version = user.version + 1;
      user.password = newPassword;
      user.updatedAt = new Date().getTime().toString();
      const res = (await this.userRepository.save(user)).toResponse();
      const { id, login, version, createdAt, updatedAt } = res;
      return {
        id,
        login,
        version,
        createdAt: Number(createdAt),
        updatedAt: Number(updatedAt),
      };
    }
    throw new HttpException(UNCORRECT_OLD_PASSWORD, 403);
  }
  async removeUser(id: string) {
    checkUuid(id);
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(NOT_FOUND, 404);
    }
  }
}
