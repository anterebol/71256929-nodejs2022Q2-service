import { UserService } from '../service/user.service';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Header,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async getUsers() {
    return await this.userService.getAll();
  }
  @Get(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id') id: string) {
    return await this.userService.getById(id);
  }
  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async addUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }
  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateUser(@Body() body: UpdatePasswordDto, @Param('id') id: string) {
    return await this.userService.updateUser(body, id);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.removeUser(id);
  }
}
