const Repair = require('../models/reapir.model');
const catchAsync = require('../utils/catchAsync');

exports.allRepair = catchAsync(
  async (req, res) => {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },
      order: [['id', 'DESC']],
    });

    res.status(200).json({
      message: 'The query has been done successs',
      results: repairs.length,
      repairs,
    });
  }
);

exports.repairById = catchAsync(
  async (req, res, next) => {
    const { repair } = req;

    res.status(200).json({
      message: `Repair with id ${repair.id} found`,
      repair,
    });
  }
);

exports.repairUpDate = catchAsync(
  async (req, res) => {
    const { repair } = req;

    await repair.update({
      status: 'completed',
    });

    res.json({
      message: 'The repair has been update',
    });
  }
);

exports.createRepair = catchAsync(
  async (req, res) => {
    const {
      date,
      userId,
      description,
      motorsNumber,
    } = req.body;

    const repair = await Repair.create({
      date,
      userId,
      description,
      motorsNumber,
    });

    res.status(201).json({
      status: 'success',
      message: 'The repair has been created!',
      repair,
    });
  }
);

exports.deleteRepair = catchAsync(
  async (req, res) => {
    const { repair } = req;

    await repair.update({
      status: 'cancelled',
    });

    res.json({
      message: 'The repair has been cancelled',
    });
  }
);
