import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/module/user.module';
import { TrackModule } from './modules/track/module/track.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from './modules/artists/module/artist.module';
import { AlbumModule } from './modules/albums/module/album.module';
import { FavoritesModule } from './modules/favorites/module/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config) => ({
        type: config.get('TYPEORM_CONNECTION'),
        host: config.get('TYPEORM_HOST'),
        username: config.get('TYPEORM_USERNAME'),
        password: config.get('TYPEORM_PASSWORD'),
        database: config.get('TYPEORM_DATABASE'),
        port: config.get('TYPEORM_PORT'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
  ],
})
export class AppModule {}
