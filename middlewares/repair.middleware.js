const Repair = require('../models/reapir.model');
const catchAsync = require('../utils/catchAsync');

exports.validExistRepair = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair not found',
      });
    }

    req.repair = repair;
    next();
  }
);
