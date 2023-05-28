require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const validationErrors = require('celebrate').errors;

// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const router = require('./routes/index');
const errors = require('./middlewares/errors');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
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
app.use(router);
app.use(validationErrors());
app.use(errors);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
