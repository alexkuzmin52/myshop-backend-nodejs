import {NextFunction, Request, Response} from 'express';
import * as Joi from 'joi';

import {emailValidator} from '../../validators/user';
import {ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';

export const emailValidatorMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const {error} = Joi.validate(req.body, emailValidator);

  if (error) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      error.details[0].message
    ));
  }

  next();
};
