import {NextFunction, Response} from 'express';

import {ActionEnum, HeaderRequestEnum, ResponseStatusCodeEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
import {tokenVerificator} from '../../helpers';
import {userService} from '../../services';
import {IRequestExtended} from '../../models';

export const confirmUserMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.get(HeaderRequestEnum.AUTHORIZATION);

    if (!token) {
      return next(new ErrorHandler(
        ResponseStatusCodeEnum.BAD_REQUEST,
        customErrors.BAD_REQUEST_CONFIRM_USER_TOKEN.message,
        customErrors.BAD_REQUEST_CONFIRM_USER_TOKEN.code
      ));
    }

    await tokenVerificator(ActionEnum.USER_REGISTER, token);
    const userByToken = await userService.findUserByActionToken(ActionEnum.USER_REGISTER, token);

    if (!userByToken) {
      return next(new ErrorHandler(
        ResponseStatusCodeEnum.NOT_FOUND,
        customErrors.NOT_FOUND.message
      ));
    }

    req.user = userByToken;
    next();

  } catch (e) {
    next(e);
  }

};
