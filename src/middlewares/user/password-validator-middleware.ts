import * as Joi from 'joi';
import {NextFunction, Request, Response} from 'express';

import {ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';
import {passwordValidator} from '../../validators';

export const passwordValidatorMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const {error} = Joi.validate(req.body, passwordValidator);

  if (error) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      error.details[0].message
    ));
  }

  next();
};
