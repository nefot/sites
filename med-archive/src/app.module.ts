// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { AuthModule } from './src/auth/auth.module.js';
import { NewsModule } from './src/news/news.module.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // Используем SQLite файл в корне проекта med-archive/database.sqlite
        type: 'sqlite',
        database: config.get('SQLITE_PATH') || join(__dirname, '..', 'database.sqlite'),
        entities: [join(__dirname, 'entity/*.{ts,js}')],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),

    // Добавляем модуль авторизации
    AuthModule,
    // Добавляем модуль новостей
    NewsModule,
  ],
})
export class AppModule {}
