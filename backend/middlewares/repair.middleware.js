const Repair = require('../models/repairs.models');
const User = require('../models/users.model');
const AppError = require('../utils/app.Error');
const catchAsync = require('../utils/catchAsync');

exports.handleCreateRepairError = catchAsync(
  async (req, res, next) => {
    const { userId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return next(
        new AppError(
          `User with id ${userId} not found`,
          404
        )
      );
    }

    next();
  }
);

exports.handleRepairByIdErrors = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const repair = await Repair.findByPk(id);

    if (!repair) {
      return next(
        new AppError(
          `Reapir with ID ${id} does not exist`,
          400
        )
      );
    }

    req.repair = repair;
    next();
  }
);

exports.handleUpdateRepairErrors = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const repair = await Repair.findByPk(id);

    if (!repair || repair.status !== 'pending') {
      return next(
        new AppError(
          `Repair with id ${id} not found, may have already completed or cancelled`,
          404
        )
      );
    }

    req.repair = repair;
    next();
  }
);

exports.handleDeleteRepairErrors = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
    if (!repair)
      next(
        new AppError(
          `Repair with id ${id} not found, may have already completed o cancelled`,
          404
        )
      );

    req.repair = repair;
    next();
  }
);
