const Repair = require('./../models/repairs.models');

exports.allRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },
      order: [['id', 'ASC']], // ordenar por id ascendente
    });
    res.status(200).json({
      message: `There are ${repairs.length} pending repairs`,
      results: repairs.length,
      repairs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving repairs',
    });
  }
};

exports.createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;
    const repair = await Repair.create({
      date,
      userId,
    });

    res.status(200).json({
      message: 'Repair created successfully',
      repair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error creating repair',
    });
  }
};

exports.repairById = async (req, res) => {
  try {
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
        message: `Repair with id ${id} not found`,
      });
    }
    res.status(200).json({
      message: `repair pending with id ${id} found`,
      repair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error completing repair',
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
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
        message: `Repair with id ${id} not found, may have already completed o cancelled`,
      });
    }

    repair.status = 'completed';
    await repair.save();
    res.status(200).json({
      message: `repair with id ${id} has been completed`,
      repair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error completing repair',
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
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
        message: `Repair with id ${id} not found, may have already completed o cancelled`,
      });
    }

    repair.status = 'cancelled';
    await repair.save();
    res.status(200).json({
      message: `repair with id ${id} has been cancelled`,
      repair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error cancelling repair',
    });
  }
};
