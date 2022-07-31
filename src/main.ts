import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

// dotenv.config();

// const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get('PORT');
  await app.listen(PORT || 4000, () => console.log(`Server work at ${PORT}`));
}
bootstrap();
