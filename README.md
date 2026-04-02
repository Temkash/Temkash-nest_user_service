## Nest User Service

Small учебный NestJS-проект с авторизацией и пользователями.

### Что есть

- регистрация и логин
- access token и refresh token
- refresh и logout
- защищенные user endpoints
- soft delete пользователя
- Swagger документация
- Jest unit tests

### Стек

- NestJS
- TypeORM
- PostgreSQL
- JWT
- bcryptjs
- Swagger
- Jest

### Запуск

```bash
npm install
npm run start:dev
```

Перед запуском создайте файл `process.env` на основе шаблона:

```bash
cp process.env.example process.env
```

### Документация

Swagger доступен по пути:

```bash
/api
```

### Тесты

```bash
npm test
```
