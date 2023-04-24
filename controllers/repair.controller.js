const User = require('../models/user.model');
const Repair = require('../models/repair.model');
const catchAsync = require('../utils/catchAsync');

exports.allRepair = catchAsync(
  async (req, res) => {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },

      include: [
        {
          model: User,
          attributes: {
            exclude: [
              'password',
              'role',
              'status',
            ],
          },
        },
      ],
    });

    res.status(200).json({
      message: 'The query has been done successs',
      results: repairs.length,
      repairs,
      User,
    });
  }
);

exports.repairById = catchAsync(
  async (req, res) => {
    const { repair } = req;

    const repairInfo = await Repair.findOne({
      where: {
        id: repair.id,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              'password',
              'role',
              'status',
            ],
          },
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      message: 'The query has been done success',
      repairInfo,
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
      description,
      motorsNumber,
      userId,
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
      message: 'The repair has been deleted',
    });
  }
);
