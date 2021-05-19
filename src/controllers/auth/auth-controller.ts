import {NextFunction, Response} from 'express';

import {ActionEnum, HeaderRequestEnum, ResponseStatusCodeEnum} from '../../constants';
import {IRequestExtended, IUser} from '../../models';
import {authService, logService} from '../../services';
import {comparePassword, tokinizer} from '../../helpers';
import {customErrors, ErrorHandler} from '../../errors';

export class AuthController {
  async loginUser(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
    try {
      const {_id, password} = req.user as IUser;
      const userInfo = req.body;
      const isSamePassword = await comparePassword(userInfo.password, password);

      if (!isSamePassword) {
        return next(new ErrorHandler(
          ResponseStatusCodeEnum.NOT_FOUND,
          customErrors.NOT_FOUND.message
        ));
      }

      const {access_token, refresh_token} = tokinizer(ActionEnum.USER_AUTH);

      await authService.createTokenPair(
        {
          accessToken: access_token,
          refreshToken: refresh_token,
          userID: _id
        }
      );
      await logService.createLog({event: ActionEnum.USER_AUTH, userId: _id});

      res.json({access_token, refresh_token});
    } catch (e) {
      next(e);
    }
  }

  async userLogout(req: IRequestExtended, res: Response): Promise<void> {
    const {_id} = req.user as IUser;
    const accessToken = req.get(HeaderRequestEnum.AUTHORIZATION);

    await authService.removeAccessToken({accessToken});
    await logService.createLog({event: ActionEnum.USER_LOGOUT, userId: _id});

    res.sendStatus(ResponseStatusCodeEnum.NO_CONTENT);
  }

}

export const authController = new AuthController();
