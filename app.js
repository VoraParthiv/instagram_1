const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

dotenv.config();
const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Social Media',
      description: 'This social media project API...!',
      version: '1.0.0',
      contact: {
        name: 'Vora Parthiv',
        email: 'voraparthiv2004@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/',
        description: 'Server URL',
      },
    ],
  },
  apis: [
    './routes/Users/*.routes.js',
    './routes/Admin/*.routes.js',
    './routes/Profile/*.routes.js',
    './routes/Posts/*.routes.js',
    './routes/Message/*.routes.js',
    './routes/UserAction/*.routes.js',
    './routes/Group/*.routes.js',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
