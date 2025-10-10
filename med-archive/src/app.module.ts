// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import { validate } from 'class-validator';
import { DataSource } from 'typeorm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
AdminJS.registerAdapter({ Database, Resource });
(Resource as any).validate = validate;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: Number(config.get('POSTGRES_PORT')),
        username: config.get('POSTGRES_USER'),
        password: String(config.get('POSTGRES_PASSWORD')),
        database: config.get('POSTGRES_DB'),
        entities: [join(__dirname, 'entity/*.{ts,js}')],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),

    // Официальный вариант: AdminModule.createAdminAsyn

  ],
})
export class AppModule {}
