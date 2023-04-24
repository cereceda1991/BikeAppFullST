const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.protect = catchAsync(
  async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        'Bearer'
      )
    ) {
      token =
        req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError(
          'You are not logged in!. Please log in to get access',
          401
        )
      );
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_JWT_SEED
    );

    const user = await User.findOne({
      where: {
        id: decoded.id,
        status: 'available',
      },
    });

    if (!user) {
      return next(
        new AppError(
          'The owner of this token it not longer available',
          401
        )
      );
    }

    req.sessionUser = user;
    next();
  }
);

exports.protectAccountOwner = catchAsync(
  async (req, res, next) => {
    const { user, sessionUser } = req;

    if (user.id !== sessionUser.id) {
      return next(
        new AppError(
          'you do not own this account',
          401
        )
      );
    }

    next();
  }
);

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError(
          'You do not have permission to perform this action',
          403
        )
      );
    }

    next();
  };
};
