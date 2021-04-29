import {NextFunction, Request, Response} from 'express';

import {IRequestExtended, IUser} from '../../models';
import {hashedPassword, tokinizer} from '../../helpers';
import {logService, mailService, userService} from '../../services';
import {ActionEnum, HeaderRequestEnum, LogEnum, ResponseStatusCodeEnum, UserStatusEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // console.log('user controller');
      // console.log(req.body);
      const user = req.body as IUser;
      user.password = await hashedPassword(user.password);
      const {_id} = await userService.createUser(user);

      const {access_token} = tokinizer(ActionEnum.USER_REGISTER);

      await userService.addActionToken(_id, {action: ActionEnum.USER_REGISTER, token: access_token});
      await mailService.sendEmail(user.email, ActionEnum.USER_REGISTER, {token: access_token});
      await logService.createLog({event: LogEnum.USER_REGISTERED, userId: _id});
      res.json({newUser: 'done!!!!'}); //TODO

    } catch (e) {
      next(e);
    }

  }

  async confirmUser(req: IRequestExtended, res: Response, next: NextFunction): Promise<any> {
    try {
      const user = req.user as IUser;
      // console.log(user);
      const {_id, status, tokens = []} = req.user as IUser;
      const tokenToDelete = req.get(HeaderRequestEnum.AUTHORIZATION);
      if (status !== UserStatusEnum.PENDING) {
        return next(new ErrorHandler(
          ResponseStatusCodeEnum.BAD_REQUEST,
          customErrors.BAD_REQUEST_USER_ACTIVATED.message,
          customErrors.BAD_REQUEST_USER_ACTIVATED.code
        ));
      }

      const index = tokens.findIndex(({action, token}) => {
        return action === ActionEnum.USER_REGISTER && token === tokenToDelete;
      });

      // как рабочий вариант:
      // const update = [] as any;
      // await userService.updateUserById({_id}, update);

      if (index !== -1) {
        tokens.splice(index, 1);
        // console.log(tokens);
        await userService.UpdateUserByProperty({_id}, {tokens} as Partial<IUser>);
      }

      await userService.UpdateUserByProperty({_id}, {status: UserStatusEnum.CONFIRMED});
      await logService.createLog({event: LogEnum.USER_CONFIRMED, userId: _id});
      await res.json(user); //TODO

    } catch (e) {
      next(e);
    }
  }

  async forgotPassword(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
    try {
      const {_id, email} = req.user as IUser;
      const {access_token} = tokinizer(ActionEnum.USER_FORGOT_PASSWORD);

      await userService.addActionToken(_id, {token: access_token, action: ActionEnum.USER_FORGOT_PASSWORD});
      await mailService.sendEmail(
        email, ActionEnum.USER_FORGOT_PASSWORD,
        {token: access_token});
      await logService.createLog({event: ActionEnum.USER_FORGOT_PASSWORD, userId: _id});

      res.end();
    } catch (e) {
      next(e);
    }

  }

  async resetPassword(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
    try {
      const {_id, tokens = []} = req.user as IUser;
      const {password} = req.body as IUser;
      const tokenToDelete = req.get(HeaderRequestEnum.AUTHORIZATION);

      const hashPassword = await hashedPassword(password);

      const index = tokens.findIndex(({action, token}) => {
        return action === ActionEnum.USER_FORGOT_PASSWORD && token === tokenToDelete;
      });

      if (index !== -1) {
        tokens.splice(0, 1);
        await userService.UpdateUserByProperty({_id}, {tokens} as Partial<IUser>);
      }
      await userService.UpdateUserByProperty({_id}, {password: hashPassword} as Partial<IUser>);
      await logService.createLog({event: ActionEnum.USER_RESET_PASSWORD, userId: _id});

      res.end();
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
