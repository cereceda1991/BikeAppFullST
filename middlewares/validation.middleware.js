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
    .withMessage('Name cannot be empty '),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty ')
    .isEmail()
    .withMessage('Must be a valid email '),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty ')
    .isLength({ min: 6 })
    .withMessage(
      'The password must contain at least 6 characters '
    ),
  validFields,
];

exports.updateUserValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty '),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty ')
    .isEmail()
    .withMessage('Must be a valid email '),
  validFields,
];

exports.createRepairValidation = [
  body('date')
    .notEmpty()
    .withMessage('Date cannot be empty ')
    .isISO8601('yyyy-mm-dd')
    .withMessage(
      'Incorrect format. uses yyyy-mm-dd '
    ),
  body('motorsNumber')
    .notEmpty()
    .withMessage('Motor number cannot be empty ')
    .isNumeric()
    .withMessage(
      'The engine number must be numeric type '
    )
    .isLength({ max: 10 })
    .withMessage(
      'Engine number maximum 10 characters '
    ),
  body('description')
    .notEmpty()
    .withMessage('Description cannot be empty '),
  validFields,
];
