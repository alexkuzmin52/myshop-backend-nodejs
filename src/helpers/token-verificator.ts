import {promisify} from 'util';
import {verify, VerifyErrors} from 'jsonwebtoken';

import {ActionEnum, ResponseStatusCodeEnum} from '../constants';
import {config} from '../config';
import {customErrors, ErrorHandler} from '../errors';

const verifyPromise = promisify(verify);

export const tokenVerificator = async (action: ActionEnum, token: string): Promise<VerifyErrors> => {
  try {
    let isValid;

    switch (action) {
      case ActionEnum.USER_REGISTER:
        isValid = await verifyPromise(token, config.JWT_CONFIRM_EMAIL_SECRET) as Promise<VerifyErrors>;
        break;
      case ActionEnum.USER_AUTH:
        isValid = await verifyPromise(token, config.JWT_AUTH_ACCESS_TOKEN_SECRET) as Promise<VerifyErrors>;
        break;
      case ActionEnum.USER_FORGOT_PASSWORD:
        isValid = await verifyPromise(token, config.JWT_FORGOT_PASSWORD_EMAIL_SECRET) as Promise<VerifyErrors>;
        break;
      default:
        throw new ErrorHandler(ResponseStatusCodeEnum.SERVER, 'wrong Action Type');
    }

    return isValid;

  } catch (e) {
    throw new ErrorHandler(
      ResponseStatusCodeEnum.UNAUTHORIZED,
      customErrors.UNAUTHORIZED_BAD_TOKEN.message);
  }
};
//TODO
