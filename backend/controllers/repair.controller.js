const User = require('../models/users.model');
const Repair = require('./../models/repairs.models');
const catchAsync = require('../utils/catchAsync');

exports.allRepairs = catchAsync(
  async (req, res, next) => {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },
      order: [['id', 'ASC']],
    });
    res.status(200).json({
      message: `There are ${repairs.length} pending repairs`,
      results: repairs.length,
      repairs,
    });
  }
);

exports.createRepair = catchAsync(
  async (req, res, next) => {
    const {
      date,
      userId,
      motorsNumber,
      description,
    } = req.body;

    const user = req.user;

    const repair = await Repair.create({
      date,
      userId,
      motorsNumber,
      description,
    });

    res.status(200).json({
      message: 'Repair created successfully',
      repair,
    });
  }
);

exports.repairById = catchAsync(
  async (req, res, next) => {
    const repair = req.repair;

    res.status(200).json({
      message: `Repair with id ${repair.id} found`,
      repair,
    });
  }
);

exports.updateRepair = catchAsync(
  async (req, res, next) => {
    const repair = req.repair;

    repair.status = 'completed';
    await repair.save();

    res.status(200).json({
      message: `Repair with id ${repair.id} has been completed`,
      repair,
    });
  }
);

exports.deleteRepair = catchAsync(
  async (req, res, next) => {
    const { repair } = req;

    repair.status = 'cancelled';
    await repair.save();
    res.status(200).json({
      message: `repair with id ${repair.id} has been cancelled`,
      repair,
    });
  }
);
