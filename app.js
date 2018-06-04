//Инициализация модулей
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');


const UsersModel = require('./models/Users.model');

// Инициализация маршрутов
const entries = require('./routes/entries');
const register = require('./routes/register');
const login = require('./routes/login');

// Инициализация промежуточных компонентов
const validate = require('./middleware/validate');
const messages = require('./middleware/messages');

const app = express();


// Подключение к MongoDB
mongoose.connect("mongodb://localhost:27017/entries", (err) => {
	if (err) return err;

	console.log('MongoDB Started!');
});

// Настройка ядра шаблона
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('res-error'));
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// Маршруты отображения и добавления постов
app.get('/', entries.list);
app.get('/post', entries.form);
app.post('/post', 
					validate.required('entry[title]'),
					validate.lengthAbove('entry[title]', 4),
					entries.submit);

// Маршруты регистрации
app.get('/register', register.form);
app.post('/register', register.submit);

// Маршруты аунтефикации
app.get('/login', login.form);
app.post('/login', login.submit);
// app.get('/logout', login.logout);

// Ошибка 404
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Обработчик ошибок
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.error = msg => this.message(msg, 'error');
  // рендер страницы ошибок
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;