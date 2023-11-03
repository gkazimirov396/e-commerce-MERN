import bcrypt from 'bcrypt';
import { body, param, query } from 'express-validator';

import { validateRequest } from './validateRequest.js';
import { User } from '../models/User.js';

const productId = validateRequest(
  param('id', 'Invalid id.').trim().isMongoId()
);

const signup = validateRequest([
  body('name', 'This field must be a string.')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('This field cannot be empty.')
    .custom(async name => {
      const user = await User.findOne({ name });
      if (user) {
        return Promise.reject(
          'User with this name exists already, please pick a new one.'
        );
      }
    }),
  body('email', 'Please enter a valid email.')
    .isEmail()
    .bail()
    .custom(async email => {
      const user = await User.findOne({ email });
      if (user) {
        return Promise.reject(
          'User with this email exists already, please pick a new one.'
        );
      }
    })
    .normalizeEmail(),
  body('password', 'Password cannot be less than 6 characters long.')
    .trim()
    .isLength({ min: 6 }),
  body('confirmPassword')
    .trim()
    .custom((pass, { req }) => {
      if (pass !== req.body.password) {
        throw new Error('Passwords have to match.');
      }
      return true;
    }),
]);

const login = validateRequest([
  body('email', 'Please enter a valid email.')
    .isEmail()
    .bail()
    .normalizeEmail()
    .custom(async email => {
      const user = await User.findOne({ email });
      if (!user) {
        return Promise.reject('A user with this email does not exist.');
      }
    }),
  body('password', 'Password cannot be less than 6 characters long.')
    .trim()
    .isLength({ min: 6 })
    .bail()
    .custom(async (password, { req }) => {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return;

      const doPasswordsMatch = await bcrypt.compare(password, user.password);
      if (!doPasswordsMatch) {
        return Promise.reject('Wrong password.');
      }
    }),
]);

const addToCart = validateRequest([
  param('id', 'Invalid id.').trim().isMongoId(),
  body('quantity', 'This field must be a positive integer.')
    .isInt({ gt: 0 })
    .optional(),
]);

const checkoutCart = validateRequest([
  body('phoneNumber', 'The number you entered is of incorrect format.')
    .trim()
    .isMobilePhone('uk-UA'),
  body('address', 'This field must be a string.')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('This field cannot be empty.'),
]);

const getProducts = validateRequest(
  query(
    'category',
    'The value you entered, is not supported. The only possible values are "female" and "male".'
  )
    .isIn(['male', 'female'])
    .optional({ checkFalsy: true })
);

export default {
  signup,
  login,
  checkoutCart,
  addToCart,
  productId,
  getProducts,
};
