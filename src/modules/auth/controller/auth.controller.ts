import {
  Body,
  Controller,
  Post,
  HttpStatus,
  Header,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('/login')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  login(@Body() authDto: CreateUserDto) {
    return this.authService.login(authDto);
  }
  @Post('/signup')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async signup(@Body() authDto: CreateUserDto) {
    return this.authService.signup(authDto);
  }
  @Post('/refresh')
  refresh() {
    return this.authService.refresh();
  }
}
