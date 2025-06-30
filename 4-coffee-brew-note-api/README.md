Ви отримали повністю робочий скелет — вставляйте коди у відповідні файли.
Далі запускаєте:

bash

npm install
npm run build
npm start
або через Docker:

bash

docker build -t brew-api .
docker run -p 3000:3000 brew-api
Swagger буде на http://localhost:3000/docs