import * as Joi from 'joi';
import {NextFunction, Request, Response} from 'express';

import {IUser} from '../../models';
import {createUserValidator} from '../../validators';

export const createUserMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.body as IUser;
  const {error} = Joi.validate(user, createUserValidator);

  if (error) {
    return next(new Error(error.details[0].message));
  }

  next();
};
