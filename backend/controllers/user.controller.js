const User = require('../models/users.model');

exports.findAll = async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
    order: [['id', 'ASC']], // ordenar por id ascendente
  });
  res.status(200).json({
    message: 'The query has been donde success',
    results: users.length,
    users,
  });
};

exports.userById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'Error',
        message: `User with id ${id} not found`,
      });
    }

    res.status(200).json({
      message: 'The query has been done success',
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message:
        'An internal server error occurred',
    });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } =
    req.body;

  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({
      message: `Email ${email} is already registered`,
    });
  }

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
};

exports.upDateUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  const { name, email } = req.body;

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `The user ${id} not found`,
    });
  }

  try {
    await user.update({
      name,
      email,
    });

    res.status(200).json({
      status: 'success',
      message: 'The user has been updated',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message:
        'An internal server error occurred',
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `The user with id ${id} not found`,
    });
  }

  await user.update({
    status: 'disabled',
  });

  res.status(200).json({
    message: `The user with id ${id} has been deleted`,
  });
};
