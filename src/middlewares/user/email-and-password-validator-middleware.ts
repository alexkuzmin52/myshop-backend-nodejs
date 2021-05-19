import * as Joi from 'joi';
import {NextFunction, Request, Response} from 'express';

import {ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';
import {emailAndPasswordValidator} from '../../validators';

export const emailAndPasswordValidatorMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const {error} = Joi.validate(req.body, emailAndPasswordValidator);

  if (error) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      error.details[0].message
    ));
  }

  next();
};
