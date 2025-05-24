# ДЗ №2. Архітектура програми Node.js. Початок роботи з Node.js

Start project
==================================

# Project overview #

Це REST API для керування завданнями (todo), реалізоване на **чистому Node.js без Express**. Воно дозволяє створювати, переглядати, оновлювати та видаляти задачі, зберігаючи їх у локальному `JSON`-файлі.

# How to start project #

Залежності:

- Node.js (v16+)
- Нічого додаткового не потрібно — все працює "з коробки"

## Команди запуску ##

```bash
git clone https://github.com/gyouk/node.js_course
cd node.js_course\2-lessons\
node index.js
```
API запускається за адресою: http://localhost:3000

## API endpoints (CRUD)

| Метод  | Шлях         | Опис                            |
|--------|--------------|---------------------------------|
| GET    | `/tasks`     | Retrieve the list of all tasks  |
| POST   | `/tasks`     | Create a new task               |
| PUT    | `/tasks`     | Update an existing task by id   |         |
| DELETE | `/tasks`     | Delete a task by id             |

---


## Project structure

```
├── index.js                  # Entry point, creates the HTTP server
├── tasks.json                # Pseudo-database storing tasks (JSON file)
├── package.json              # Project metadata and scripts
├── package-lock.json         # Dependency lock file
│
├── helpers/
│   └── router.js             # Handles routing for GET, POST, PUT, DELETE
│
├── layers/
│   ├── controller.js         # Handles request/response, calls services
│   ├── service.js            # Business logic (task operations)
│   └── model.js              # Reads/writes tasks.json (simulated DB layer)
```