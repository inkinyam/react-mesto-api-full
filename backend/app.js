require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const { celebrate, Joi } = require('celebrate');

const auth = require('./middlewares/auth');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { ErrNotFound } = require('./errors/errors');

const allowedCors = {
  origin: ['http://inkinyam.nomoredomains.sbs', 'https://inkinyam.nomoredomains.sbs', 'http://api.inkinyam.nomoredomains.sbs', 'https://api.inkinyam.nomoredomains.sbs'],
  credentials: true,
};

const {
  addUser,
  login,
} = require('./controllers/usersControllers');

const { PORT = 3000 } = process.env;

const DATABASE_URL = 'mongodb://localhost:27017/mestodb';
mongoose.connect(DATABASE_URL);

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, // можно совершить максимум 1000 запросов с одного IP
});

app.use(helmet());
app.use(limiter); // защита от ддос атак
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors(allowedCors));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роут для регистрации
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), addUser);

// роут для логина пользователя
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

// защита роутов для неавторизированных пользователей
app.use(auth);

// остальные роуты
app.use('/users', require('./routes/usersRoutes'));
app.use('/cards', require('./routes/cardsRoutes'));

app.use(errorLogger);

app.use((req, res, next) => {
  next(new ErrNotFound('Путь не найден'));
});

// обработчики ошибок
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Приложение запущено на ${PORT}`);
});
