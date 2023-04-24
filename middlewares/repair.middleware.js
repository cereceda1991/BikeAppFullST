const Repair = require('../models/repair.model');

exports.validExistRepair = async (
  req,
  res,
  next
) => {
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
};

exports.validateRepairStatus = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: ['pending', 'completed'],
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'The repair not found ',
    });
  }
  req.repair = repair;
  next();
};
