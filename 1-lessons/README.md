
# Habit Tracker CLI

## Опис

**Habit Tracker CLI** — це консольний застосунок для трекінгу звичок на чистому Node.js (ESM, import/export), без сторонніх бібліотек для функціоналу. Дані зберігаються у файлі `database.json`.  
Архітектура відповідає принципам MVC (Model-View-Controller) та розділяє бізнес-логіку, контролери та моделі.

---
### Команди

- ```sh
    node index.js add --name "Погодувати рибку" --freq daily
- ```sh
    node index.js list
- ```sh
    node index.js done --id 12345
- ```sh
    node index.js stats
- ```sh
    node index.js delete --id 12345
- ```sh 
    node index.js update --id 12345 --name "Поспати після всього..." --freq weekly

### Змінні оточення

- `DAY_OFFSET=3 node index.js stats` — тестування майбутніх/минулих днів
 Додано dotenv для зручності роботи зі змінними оточення.
- `node -r dotenv/config index.js done --id `


**Linux/macOS/bash:**
  ```sh
  DAY_OFFSET=2 node index.js done --id 12345
  ```
**Windows PowerShell:**

** powershell **
```sh
    $env:DAY_OFFSET=2; node index.js done --id 12345
```
**    Windows CMD:**

cmd
```sh
    set DAY_OFFSET=2 && node index.js done --id 12345
```

Пояснення:
        0 (або не задано) — сьогодні
        1 — завтра
        -1 — вчора
        2 — післязавтра
        

Використовуйте для швидкого тестування статистики.


### Лінтинг

-lint через lint 
```sh 
        npm run lint .
```
### Автоформатування
- fix через lint 
 ```sh
     npm run fix
 ```
### Структура 
```

1-lessons/
├── controllers/      // отримують параметри з командного рядка, готують дані для сервісів
│   └── habitController.js
├── services/         // вся бізнес-логіка: що робити з цими даними
│   └── habitService.js
├── models/           // тільки читання/запис у database.json
│   └── habitModel.js
├── router/           // розбирає команду та викликає потрібний контролер
│   └── router.js
├── database.json     // тут зберігаються всі звички
├── index.js          // точка входу
├── README.md         // коротка документація

```

