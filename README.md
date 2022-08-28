# Проект: МЕСТО (React App)
Данный проект является аналогом Инстаграмм.

## Что это за проект?
Это  проект, разработанный мною в процессе обучения в Яндекс.Практикуме на веб-разработчика.
Разработана как frontend, так и backend части приложения, со следующими возможностями: 
- регистрация пользователя
- авторизация пользователя
- добавление новой карточки пользователем
- удаление карточки. Карточки, созданные другими пользователями удалить нельзя.
- возможность поставить и убрать "лайк" с карточки
- возможность редактирования имени и "о себе" у пользователя
- возможность обновления аватара пользователя

### Инструменты, используемые в работы:
Обе части приложения выложены на одном сервере с доступом через домен.

## Frontend часть приложения:
расположена в директории `frontend/`
![стрелка](https://img.icons8.com/sf-black/64/chevron-right.png) HTML,CSS и фреймфорк React JS
Проект опирается на методологию БЭМ. В частности используется файловая структура Nested.
В проекте используется адаптивная верстка с помощью flex-box и grid для отображения проекта на разных устройствах с различным разрешением.
Для реализации логики работы всех компонентов используется JavaScript и фреймворк React.

## Backend часть приложения:
расположена в директории `backend/`
![стрелка](https://img.icons8.com/sf-black/64/chevron-right.png) Node.js, express.js, mongoDB, mongoose, ngnix, pm2
В проекте организовано логгирование запросов и ошибок, доступ к серверу организован через SSH, обработка CORS-запросов на сервере

## Доменты для проекта:
**Frontend**: [тут](inkinyam.nomoredomains.sbs)
**Backend**: [тут](api.inkinyam.nomoredomains.sbs)
**Публичный IP сервера**: 51.250.65.30


