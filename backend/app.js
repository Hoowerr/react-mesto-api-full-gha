require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const validationErrors = require('celebrate').errors;
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');
const errors = require('./middlewares/errors');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({
  origin: ['http://localhost:3001', 'https://hoower.nomoredomains.monster', 'http://158.160.3.169:3000'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
  preflightContinue: false,
}));

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(validationErrors());
app.use(errors);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
