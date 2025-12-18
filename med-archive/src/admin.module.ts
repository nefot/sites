// // // src/admin/admin.module.ts
// // import { Module } from '@nestjs/common';
// // import { AdminModule as AdminJsModule } from '@adminjs/nestjs';
// // import * as AdminJS from 'adminjs';
// // import * as AdminJSTypeorm from '@adminjs/typeorm';
// //
// // // Регистрация адаптера
// // AdminJS.default.registerAdapter({
// //   Database: AdminJSTypeorm.Database,
// //   Resource: AdminJSTypeorm.Resource,
// // });
//
// @Module({
//   imports: [
//     // AdminJsModule.createAdmin({
//     //   adminJsOptions: {
//     //     rootPath: '/admin',
//     //     resources: [],
//     //   },
//     // }),
//   ],
// })
// export class AdminModule {}