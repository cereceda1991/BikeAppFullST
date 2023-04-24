const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const routerUser = require('./routes/users.routes');
const routerRepair = require('./routes/repair.routes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/users', routerUser);
app.use('/api/v1/repairs', routerRepair);

app.all('*', (req, res, next) => {
  return next(
    new AppError(
      `Cannot find ${req.originalUrl} on this server!`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
