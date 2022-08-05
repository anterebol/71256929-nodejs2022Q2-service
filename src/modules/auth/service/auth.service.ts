import { validate } from 'uuid';
import { UserService } from './../../user/service/user.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(authDto: CreateUserDto) {
    const user = await this.validateUser(authDto);
    return this.generateToken(user);
  }
  async signup(authDto: CreateUserDto) {
    const candidat = await this.userService.getUserByEmail(authDto.login);
    if (candidat) {
      throw new HttpException(
        'Пользователь уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(
      authDto.password,
      Number(process.env.CRYPT_SALT),
    );
    const user = await this.userService.createUser({
      ...authDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }
  async refresh() {
    return;
  }
  private generateToken(user) {
    const payload = { login: user.login, userId: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  private async validateUser(authDto) {
    const user = await this.userService.getUserByEmail(authDto.login);
    if (user) {
      const isCorrectPassword = await bcrypt.compare(
        authDto.password,
        user.password,
      );
      if (user && isCorrectPassword) {
        return user;
      }
    }
    throw new HttpException('login or password is incorrect', 403);
  }
}
