import { AuthModule } from './../../auth/module/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './../entity/user.entity';
import { Module, forwardRef } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
