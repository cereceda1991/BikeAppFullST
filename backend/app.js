const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const AppError = require('./utils/app.Error');
const globalErrorHandler = require('./controllers/error.controller');

const routerUser = require('./routes/userRoutes.route');
const routerRepair = require('./routes/repairRoutes.route');

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/repairs', routerRepair);
app.use('/api/v1/users', routerUser);

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
