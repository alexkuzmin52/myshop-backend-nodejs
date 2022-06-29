import {NextFunction, Request, Response} from 'express';

import {ActionEnum, HeaderRequestEnum, ResponseStatusCodeEnum, UserStatusEnum} from '../../constants';
import {IRequestExtended, IUser, IUserFilterQuery} from '../../models';
import {customErrors, ErrorHandler} from '../../errors';
import {hashedPassword, tokinizer} from '../../helpers';
import {logService, mailService, userService} from '../../services';
import {UserQueryBuilder} from '../../helpers/query-builders/user';
import * as fs from 'fs-extra';
import * as path from 'path';

export class UserController {
  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.body as IUser;
      user.password = await hashedPassword(user.password);

      const {_id} = await userService.createUser(user);
      const {access_token} = tokinizer(ActionEnum.USER_REGISTER);

      await userService.addActionToken(_id, {action: ActionEnum.USER_REGISTER, token: access_token});
      await mailService.sendEmail(user.email, ActionEnum.USER_REGISTER, {token: access_token});
      await logService.createLog({event: ActionEnum.USER_REGISTER, userId: _id});
      res.json({newUser: 'done!!!!'}); //TODO

    } catch (e) {
      next(e);
    }

  }

  confirmUser = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<any> => {
    try {
      const user = req.user as IUser;
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
        await userService.UpdateUserByProperty({_id}, {tokens} as Partial<IUser>);
      }

      await userService.UpdateUserByProperty({_id}, {status: UserStatusEnum.CONFIRMED});
      await logService.createLog({event: ActionEnum.USER_CONFIRMED, userId: _id});

      res.json(user);

    } catch (e) {
      next(e);
    }
  }

  forgotPassword = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
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

  resetPassword = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
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

  getUsers = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('getUsers********************************************************');
      const users = await userService.getAllUsers();
      // console.log(users);
      res.json(users);
    } catch (e) {
      next(e);
    }

  }

  addUserPhoto = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userID = req.user as Partial<any>;
      const photo = req.body.photo;

      const updatedUser = await userService.UpdateUserByProperty({_id:userID._id}, {photo});

      if (updatedUser) {
        const filePath = `public/users/${updatedUser._id}/${updatedUser.photo}`;
        const typeFile = path.extname(filePath).slice(1);
        const loadingFile = fs.createReadStream(filePath);
        loadingFile.on('open', () => {
          res.setHeader('Content-Type', `image/${typeFile}`);
          loadingFile.pipe(res);
        });
      }
    } catch (e) {
      next(e);
    }
  }

  getUser = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
    try {
      // console.log(req.params.userID);
      // const userById = await userService.getUserById(Types.ObjectId(req.params.userID));
      // const userByParam =await userService.getUserByParam(req.params.userID);
      // console.log(userByParam);
      const userByParams = await userService.getUserByParams({_id: req.params.userID});
      // console.log(userByParams);
      // console.log(userById);
      res.json(userByParams);
    } catch (e) {
      next(e);
    }
  }

  getUsersByFilter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.query.limit) {
        req.query.limit = '40';
      }
      if (!req.query.page) {
        req.query.page = '1';
      }

      const filterQuery = UserQueryBuilder(req.query as IUserFilterQuery);

      const users = await userService.findUsersByFilter(filterQuery, +req.query.limit, +req.query.page);

      if (users.length) {
        res.json(users);
      } else {
        return next(new ErrorHandler(ResponseStatusCodeEnum.NOT_FOUND,
          customErrors.NOT_FOUND.message));
      }
    } catch (e) {
      next(e);
    }
  }

  updateUser = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params = req.body as Partial<any>;
      const userID = req.params.userID as string;
      const updatedUser = await userService.UpdateUserByProperty({_id: userID}, params);
      res.json(updatedUser);
    } catch (e) {
      next(e);
    }
  }

  getUserPhoto = (req: IRequestExtended, res: Response, next: NextFunction) => {
    const userID = req.params.userID as string;
    const userPhoto = req.params.userPhoto as string;
    const filePath = `public/users/${userID}/${userPhoto}`;
    const typeFile = path.extname(filePath);
    const loadingFile = fs.createReadStream(filePath);
    loadingFile.on('open', () => {
      res.setHeader('Content-Type', `image/${typeFile}`);
      loadingFile.pipe(res);
    });
  }
}

export const userController = new UserController();
