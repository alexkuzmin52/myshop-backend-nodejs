import {NextFunction, Request, Response} from 'express';

import {IUser} from '../../models';
import {userService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';

export const checkIsEmailAlreadyExistMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const {email} = req.body as IUser;
  const userByEmail = await userService.findOneByProperty({email});

  if (userByEmail) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_CREATE_USER_EMAIL.message,
      customErrors.BAD_REQUEST_CREATE_USER_EMAIL.code
    ));
  }

  next();
};
