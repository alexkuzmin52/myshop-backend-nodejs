import * as jwt from 'jsonwebtoken';
import {ActionEnum, ResponseStatusCodeEnum} from '../constants';
import {config} from '../config';
import {customErrors, ErrorHandler} from '../errors';

export const tokinizer = (action: ActionEnum): { access_token: string, refresh_token: string } => {
  let access_token = '';
  let refresh_token = '';

  switch (action) {
    case ActionEnum.USER_REGISTER:
      access_token = jwt.sign({}, config.JWT_CONFIRM_EMAIL_SECRET, {expiresIn: config.JWT_CONFIRM_EMAIL_LIFETIME});
      break;
    case ActionEnum.USER_FORGOT_PASSWORD:
      access_token = jwt.sign({}, config.JWT_FORGOT_PASSWORD_EMAIL_SECRET, {expiresIn: config.JWT_FORGOT_PASSWORD_EMAIL_LIFETIME});
      break;
    case ActionEnum.USER_AUTH:
      access_token = jwt.sign({}, config.JWT_AUTH_ACCESS_TOKEN_SECRET, {expiresIn: config.JWT_AUTH_ACCESS_TOKEN_LIFETIME});
      refresh_token = jwt.sign({}, config.JWT_AUTH_REFRESH_TOKEN_SECRET, {expiresIn: config.JWT_AUTH_REFRESH_TOKEN_LIFETIME});
      break;
    default:
      throw new ErrorHandler(ResponseStatusCodeEnum.SERVER, customErrors.WRONG_ACTION_TYPE.message, customErrors.WRONG_ACTION_TYPE.code);
  }

  return {access_token, refresh_token};

};
