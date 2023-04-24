const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.validIfExistUser = catchAsync(
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
        new AppError('User not found', 404)
      );
    }

    req.user = user;
    next();
  }
);

exports.validExistUserbyId = catchAsync(
  async (req, res, next) => {
    const { userId } = req.body;

    const user = await User.findOne({
      where: {
        id: userId,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `The user ${userId} not found`,
      });
    }

    req.body.userId = userId;
    next();
  }
);
