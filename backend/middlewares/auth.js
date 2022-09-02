const jwt = require('jsonwebtoken');
require('dotenv').config();

const { ErrAutorization } = require('../errors/errors');

const { NODE_ENV, SECRETKEY } = process.env;

const extractBearerToken = (header) => {
  const token = header.replace('Bearer ', '');
  return token;
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrAutorization('Вам нужно авторизироваться');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRETKEY : 'secret');
  } catch (err) {
    throw new ErrAutorization('Вам нужно авторизироваться');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
