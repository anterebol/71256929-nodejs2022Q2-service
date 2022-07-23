import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from '../entity/track.entity';
import { Module } from '@nestjs/common';
import { TrackController } from '../controller/track.controller';
import { TrackService } from '../service/track.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
