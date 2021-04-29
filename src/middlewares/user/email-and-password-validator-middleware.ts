import {NextFunction, Request, Response} from 'express';
import * as Joi from 'joi';

import {emailAndPasswordValidator} from '../../validators';
import {ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';

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
