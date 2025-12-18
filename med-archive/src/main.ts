import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DataSource } from 'typeorm';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  // Глобальная валидация DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Включаем CORS для доступа с фронтенда — явно разрешаем заголовки Authorization и Content-Type
  app.enableCors({
    origin: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const adminTypeorm = await import('@adminjs/typeorm');
  const { Database, Resource } = adminTypeorm;
  AdminJS.registerAdapter({ Database, Resource });

  const dataSource = app.get(DataSource);

  const resources = dataSource.entityMetadatas
    .filter((m) => typeof m.target === 'function' && m.target.name !== 'Base')
    .map((m) => ({
      resource: m.target,
    }));

  console.log(
    'AdminJS resources:',
    resources.map((r) =>
      typeof r.resource === 'function' ? r.resource.name : String(r.resource),
    ),
  );

  const admin = new AdminJS({
    resources,
    rootPath: '/admin',
    branding: { companyName: 'My Admin' },
  });

  const router = AdminJSExpress.buildRouter(admin as any);
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.use(admin.options.rootPath, router);

  await app.listen(port);
  console.log(`App listening on ${port}, admin at /admin`);
}

bootstrap();
