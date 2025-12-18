# MedArchive

Краткое описание

MedArchive — простой демонстрационный сайт для публикации и просмотра новостей и материалов медицинской тематики. Проект содержит отдельные папки для фронтенда (React + Vite + TypeScript) и бэкенда (NestJS). На сайте есть список новостей, фильтры, возможность поиска по тексту и по тегам (с префиксом "::"), а также страница для добавления новостей (для авторизованных пользователей).

Автор

090302-ИСТа-023 Швырев Артем Павлович

ВИДЕО РАБОТЫ ПРОЕКТА
[Desktop 2025-12-19 1-17-53.mp4](Desktop%202025-12-19%201-17-53.mp4)
Короткая инструкция по запуску (Windows, cmd.exe)

1) Установите Node.js (рекомендуется версия 18+).

2) Установите зависимости для фронтенда и бэкенда.

- В корне репозитория (у проекта есть подпапки `frontend` и `med-archive`):

cd /d C:\Users\artyo\WebstormProjects\MedArchive\frontend
npm install

cd /d C:\Users\artyo\WebstormProjects\MedArchive\med-archive
npm install

3) Запуск разработки фронтенда

cd /d C:\Users\artyo\WebstormProjects\MedArchive\frontend
npm run dev

По умолчанию Vite запустит фронтенд на http://localhost:5173.

4) Запуск разработки бэкенда (NestJS)

cd /d C:\Users\artyo\WebstormProjects\MedArchive\med-archive
npm run start:dev

Если в `package.json` мед-архива нет скрипта `start:dev`, используйте

npm run start

По умолчанию NestJS запускается на http://localhost:3000.

5) Сборка производства

- Сборка фронтенда:

cd /d C:\Users\artyo\WebstormProjects\MedArchive\frontend
npm run build

- Сборка бэкенда зависит от настроек в `med-archive/package.json` (tsc/webpack). Ознакомьтесь с `med-archive/README.md` или `package.json`.

Примечания

- Файлы базы данных и временные тестовые файлы находятся в папке `med-archive` (например, `database.sqlite`, `tmp-token.txt` и т.п.).
- Адреса и порты можно изменить в конфигурациях Vite и NestJS.

