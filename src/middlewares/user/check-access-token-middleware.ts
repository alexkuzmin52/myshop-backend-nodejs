import {NextFunction, Response} from 'express';

import {ActionEnum, HeaderRequestEnum, ResponseStatusCodeEnum} from '../../constants';
import {IRequestExtended} from '../../models';
import {authService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {tokenVerificator} from '../../helpers';

export const checkAccessTokenMiddleware = async (
  req: IRequestExtended,
  res: Response,
  next: NextFunction): Promise<any> => {
  try {
    const token = req.get(HeaderRequestEnum.AUTHORIZATION);

    if (!token) {
      return next(new ErrorHandler(
        ResponseStatusCodeEnum.BAD_REQUEST,
        customErrors.BAD_REQUEST_NO_TOKEN.message,
        customErrors.BAD_REQUEST_NO_TOKEN.code
      ));
    }

    await tokenVerificator(ActionEnum.USER_AUTH, token);

    const userByAccessToken = await authService.findUserByAccessToken({accessToken: token});

    if (!userByAccessToken) {
      return next(new ErrorHandler(
        ResponseStatusCodeEnum.NOT_FOUND,
        customErrors.NOT_FOUND.message
      ));
    }

    req.user = userByAccessToken.userID;
    next();

  } catch (e) {
    next(e);
  }
};
