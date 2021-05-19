import * as Joi from 'joi';
import {NextFunction, Request, Response} from 'express';

import {ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';
import {emailValidator} from '../../validators/user';

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
