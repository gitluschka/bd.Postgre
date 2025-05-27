# SecureLog

Веб-приложение для регистрации и логирования действий пользователей с использованием Fastify + PostgreSQL.

## Запуск

1. Установить Node.js, npm, PostgreSQL.
2. `cd backend && npm install`
3. Создать базу данных `securelog` (или поменять строку подключения в backend/db/index.js)
4. Выполнить SQL из backend/db/functions.sql и backend/db/triggers.sql в вашей БД
5. Поместить сертификаты SSL (localhost.pem, localhost-key.pem) в папку backend/
6. `node server.js` (или `npm start` если добавишь в package.json)
7. Открыть index.html из frontend/ в браузере.

## Структура проекта

- backend/ — сервер на Fastify, PostgreSQL, роуты, утилиты
- frontend/ — html + js для работы с API
- backups/ — бэкапы pg_dump

**Для теста HTTPS зайди на https://localhost:3000 и подтверди исключение для сертификата.**

