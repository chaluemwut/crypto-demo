import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://35.240.215.47',
      'https://tris-web.vercel.app'
    ],
    credentials: true
  })
  app.setGlobalPrefix('api')
  await app.listen(10000)
}
bootstrap();
