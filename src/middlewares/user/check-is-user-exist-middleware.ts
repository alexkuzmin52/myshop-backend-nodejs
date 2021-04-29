import {NextFunction, Response} from 'express';

import {IRequestExtended, IUser} from '../../models';
import {userService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';

export const checkIsUserExistMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
  const {email} = req.body as Partial<IUser>;

  const userByEmail = await userService.findOneByProperty({email});

  if (!userByEmail) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.NOT_FOUND,
      customErrors.NOT_FOUND.message
    ));
  }

  req.user = userByEmail;
  next();
};
