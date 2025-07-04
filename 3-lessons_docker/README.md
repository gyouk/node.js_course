# ДЗ №3. Docker для Node.js

## Опис

Завдання: повністю контейнеризувати два Node.js-сервіси:
- **redis-like** — простий  key/value HTTP-сервер 
- **kv-server** — сервіс-клієнт на Express, який використовує redis-like як сховище даних.

---

## Структура проєкту

3-lessons_docker/
├── docker-compose.yml
├── docker-compose.prod.yml
|──README.md
├── kv-server/
│ ├── server.js
│ └── Dockerfile.kv
│ └── Dockerfile.kv.dev
│ └── package.json
│ └── eslint.config.js
└── redis-like/
├── server.js
└── Dockerfile.redis
└── package.json
└── eslint.config.js

---

## Швидкий старт

### 1. Побудова та запуск контейнерів
1. Запустити Docker Compose для розробки:
 ``` bash
  docker compose up --build
  ```
 1.1. Перевірити, що обидва сервіси запущені:
   - redis-like на http://localhost:4000
   - kv-server на http://localhost:8080

### 2. Запуск у продакшн-режимі
``` bash
    docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build

```
2. Тестування API
Додати ключ:
 
``` bash
POST http://localhost:8080/kv
Content-Type: application/json
{
  "key": "mykey",
  "value": "bar"
}
```
Отримати значення:

``` bash
GET http://localhost:8080/kv/mykey
``` 
Відповідь: { "value": "bar" }

---
### Технології
- Node.js (чистий http-модуль)

- Docker, Docker Compose

---
### Коротко про сервіси
 
### Redis-like:

- GET /get?key=mykey → { "value": "bar" | null }

- POST /set body { "key": "...", "value": "..." } → { "ok": true }

### kv-server:

- GET /kv/:key → аналогічно редісу

- POST /kv → аналогічно редісу

- URL redis-like задається через REDIS_URL (env), напр. http://redis:4000


---
