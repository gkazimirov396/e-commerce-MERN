import { validationResult } from 'express-validator';

export const validateRequest = validations => {
  return async (req, res, next) => {
    try {
      if (!Array.isArray(validations)) {
        await validations.run(req);
      } else {
        await Promise.all(validations.map(validation => validation.run(req)));
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.status = 422;
        error.data = errors.array();
        throw error;
      }

      next();
    } catch (err) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  };
};
