Folder-based router à la Next .js App Router для простого REST-API (CRUD над ресурсом users) із «БД» database.json
---

## Як запустити

1. **Встанови Node.js (18+)**
2. Клонуй репозиторій/завантаж код
3. У корені проєкту:
    ```bash
    npm install
    node index.js
    ```
## Скрипти (package.json)

- `npm start` — запуск сервера
- `npm run start:dev` — запуск із автоперезапуском (nodemon)
- `npm run lint` — ESLint перевірка
- `npm run fix` — ESLint автофікс
- `npm test` — тестова заглушка

> Для start:dev потрібен nodemon:  
> `npm install --save-dev nodemon`

> Для lint/fix потрібен eslint:  
> `npm install --save-dev eslint`

4. Сервер стартує на http://localhost:3000

---

## API-приклади

- **Створити користувача:**
    ```bash
    curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"Vlad"}'
    ```

- **Отримати всіх користувачів:**
    ```bash
    curl http://localhost:3000/users
    ```

- **Отримати користувача по id:**
    ```bash
    curl http://localhost:3000/users/1
    ```

- **Оновити користувача:**
    ```bash
    curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name":"New Name"}'
    ```

- **Видалити користувача:**
    ```bash
    curl -X DELETE http://localhost:3000/users/1
    ```

---
# Структура проєкту


├─ routes/          (обов’язково)

│   └─ users/

│       ├─ route.js      (GET /users, POST /users)

│       └─ [anything]/

│           └─ route.js  (GET, PUT, DELETE /users/:id)

├─ services/

│   └─ users.service.js

├─ lib/

│   └─ router.js        (сканер + диспетчер)

├─ database.json

└─ index.js (entry, http.createServer)