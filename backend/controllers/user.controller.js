const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.findAll = catchAsync(
  async (req, res, next) => {
    const users = await User.findAll({
      where: {
        status: 'available',
      },
      order: [['id', 'ASC']],
    });
    res.status(200).json({
      message: 'The query has been done success',
      results: users.length,
      users,
    });
  }
);

exports.userById = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;
    res.status(200).json({
      message: 'The query has been done success',
      user,
    });
  }
);

exports.createUser = catchAsync(
  async (req, res, next) => {
    const { name, email, password, role } =
      req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });
    res.status(201).json({
      status: 'success',
      message: `User ${email} has been created`,
      user: newUser,
    });
  }
);

exports.upDateUser = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    let user = await User.findOne({
      where: {
        id,
      },
    });
    const { name, email } = req.body;
    await user.update({
      name,
      email,
    });
    res.status(201).json({
      status: 'success',
      message: 'The user has been updated',
    });
  }
);

exports.deleteUser = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;
    await user.update({
      status: 'disabled',
    });
    res.status(201).json({
      message: `The user with id ${id} has been deleted`,
    });
  }
);
