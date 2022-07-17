import { CreateUserDto } from '../dto/create-user.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { db } from 'src/db/db';
import { checkUuid } from 'src/uuid/uuid';
import { searchElement } from 'src/search/search';
import { USER, UNCORRECT_OLD_PASSWORD } from 'src/constants/constants';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  getAll() {
    const res = db[USER].map((user) => {
      const resUser = {};
      for (const key in user) {
        if (key !== 'password') {
          resUser[key] = user[key];
        }
      }
      return resUser;
    });
    return res;
  }
  getById(id: string) {
    checkUuid(id);
    const user = searchElement(USER, id);
    const res = {};
    for (const key in user) {
      if (key !== 'password') {
        res[key] = user[key];
      }
    }
    return res;
  }
  createUser(body: CreateUserDto) {
    const { password, login } = body;
    const res = {
      id: uuidv4(),
      login,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    const user = {
      password,
      ...res,
    };
    db[USER].push(user);
    return res;
  }
  updateUser(body: UpdatePasswordDto, id: string) {
    checkUuid(id);
    searchElement(USER, id);
    const { oldPassword, newPassword } = body;
    const index = db[USER].findIndex((user) => user.id === id);
    if (db[USER][index].password === oldPassword) {
      db[USER][index].version = db[USER][index].version + 1;
      db[USER][index].password = newPassword;
      db[USER][index].updatedAt = new Date().getTime();
      const res = {};
      for (const key in db[USER][index]) {
        if (key !== 'password') {
          res[key] = db[USER][index][key];
        }
      }
      return res;
    }
    throw new HttpException(UNCORRECT_OLD_PASSWORD, 403);
  }
  removeUser(id: string) {
    checkUuid(id);
    searchElement(USER, id);
    const i = db[USER].findIndex((user) => user.id === id);
    db[USER].splice(i, 1);
    return 'deleted';
  }
}
