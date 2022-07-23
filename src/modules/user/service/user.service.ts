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
    const user = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: new Date().getTime().toString(),
      updatedAt: new Date().getTime().toString(),
    };
    const createdUser = this.userRepository.create(user);
    return (await this.userRepository.save(createdUser)).toResponse();
  }
  async updateUser(body: UpdatePasswordDto, id: string) {
    checkUuid(id);
    const user = await this.userRepository.findOne({ where: { id } });
    const { oldPassword, newPassword } = body;
    if (user.password === oldPassword) {
      user.version = user.version + 1;
      user.password = newPassword;
      user.updatedAt = new Date().getTime().toString();
      return await this.userRepository.save(user);
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
