const User = require('../models/users.model');
const AppError = require('../utils/app.Error');
const catchAsync = require('../utils/catchAsync');

exports.handleUserByIdErrors = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return next(
        new AppError(
          `User with id ${id} not found`,
          404
        )
      );
    } else if (user.status === 'available') {
      req.user = user;
      return next();
    } else if (user.status === 'disabled') {
      return next(
        new AppError(
          `User with id ${id} is disabled`,
          404
        )
      );
    }
  }
);

exports.handleCreateUserErrors = catchAsync(
  async (req, res, next) => {
    const { email } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return next(
        new AppError(
          `Email ${email} is already registered`,
          400
        )
      );
    }

    next();
  }
);

exports.handleUpDateUserErrors = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return next(
        new AppError(
          `User with id ${id} not found`,
          404
        )
      );
    }

    next();
  }
);

exports.handleDeleteUserErrors = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user)
      next(
        new AppError(
          `User with id ${id} not found`,
          404
        )
      );

    req.user = user;
    next();
  }
);
