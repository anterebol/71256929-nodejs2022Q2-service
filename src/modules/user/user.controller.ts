import { Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { db } from 'src/db/db';

@Controller('user')
export class UserController {
  @Get()
  getUsers() {
    return db;
  }
  @Get()
  getUser() {
    return 'user';
  }
  @Post()
  addUser() {
    return 'add user';
  }
  @Put()
  updateUser() {
    return 'Update user';
  }
  @Delete()
  deleteUser() {
    return 'user delte';
  }
}
