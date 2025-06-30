# Coffee Brew Note API

REST API для зберігання нотаток про заварювання кави з документацією OpenAPI та валідацією через Zod.

---

## Особливості

- Node.js + Express
- DTO/валидація через [Zod](https://zod.dev/)
- Автоматична OpenAPI/Swagger-документація
- Архітектура: DI, Registry, Middleware
- Docker-ready, легкий production-образ

---

## Швидкий старт

### 1. Клонування

```bash
git clone <your-repo-url>
cd coffee-brew-note-api
``` 
### 2. Встановлення залежностей

```bash
npm install

```
### 3. Запуск у розробці
    ```bash
     npm run dev
    
    ```

API буде доступний на http://localhost:3000.

### 4. Документація OpenAPI
   Swagger-документація:
   http://localhost:3000/docs
   | Метод  | Шлях              | Опис                  |
   | ------ | ----------------- | --------------------- |
   | GET    | `/api/brews`      | Список усіх нотаток   |
   | GET    | `/api/brews/{id}` | Одна нотатка по ID    |
   | POST   | `/api/brews`      | Створити нову нотатку |
   | PUT    | `/api/brews/{id}` | Оновити нотатку       |
   | DELETE | `/api/brews/{id}` | Видалити нотатку      |


## Docker
1. Збірка production-образу
    ```bash
        docker build -t coffee-api:prod .

    ```

2. Запуск контейнера
   ```bash
   docker run -it --rm -p 3000:3000 coffee-api:prod
   ```
## Архітектура проєкту

├── src/
│   ├── controllers/
│   ├── dto/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── openapi/
│   ├── di/
│   ├── index.js
│   └── server.js
├── Dockerfile
├── package.json
└── README.md

controllers/ – логіка роботи з API

dto/ – Zod-схеми для валідації та OpenAPI

middlewares/ – rate-limit, валідація, ін.

services/ – бізнес-логіка, робота з даними

routes/ – маршрутизація

openapi/ – OpenAPI-реєстрація схем/ендпоінтів

di/ – контейнер залежностей