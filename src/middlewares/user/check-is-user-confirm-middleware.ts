import {NextFunction, Response} from 'express';

import {IRequestExtended, IUser} from '../../models';
import {ResponseStatusCodeEnum, UserStatusEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';

export const checkIsUserConfirmMiddleware = (req: IRequestExtended, res: Response, next: NextFunction): void => {
  const {status} = req.user as IUser;

  if (status !== UserStatusEnum.CONFIRMED) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.FORBIDDEN,
      customErrors.FORBIDDEN_USER_NOT_CONFIRMED.message,
      customErrors.FORBIDDEN_USER_NOT_CONFIRMED.code
    ));
  }

  next();
};
