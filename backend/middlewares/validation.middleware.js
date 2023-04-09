const {
  body,
  validationResult,
} = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage(
      'Email is not in a valid format'
    ),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 6 })
    .withMessage(
      'Password must have at least 6 characters'
    ),
  body('role')
    .notEmpty()
    .withMessage('role cannot be empty'),
  validFields,
];

exports.updateUserValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage(
      'Email is not in a valid format'
    ),
  validFields,
];

exports.createRepairValidation = [
  body('date')
    .notEmpty()
    .withMessage('Date cannot be empty')
    .isISO8601()
    .withMessage(
      'Date must be in ISO8601 format'
    ),
  body('userId')
    .notEmpty()
    .withMessage('User ID cannot be empty')
    .isNumeric()
    .withMessage('User ID must be a number'),
  body('motorsNumber')
    .notEmpty()
    .withMessage('Motor number cannot be empty'),
  body('description')
    .notEmpty()
    .withMessage('Description cannot be empty'),
  validFields,
];
