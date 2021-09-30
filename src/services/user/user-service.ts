import {Types} from 'mongoose';

import {ActionEnum} from '../../constants';
import {IUser, IUserToken} from '../../models';
import {UserModel, UserType} from '../../database';

export class UserService {
  createUser(user: Partial<IUser>): Promise<UserType> {
    const userToSave = new UserModel(user);

    return userToSave.save();
  }

  addActionToken(userId: string, tokenObject: IUserToken): Promise<IUser> {
    return UserModel.update(
      {_id: Types.ObjectId(userId)},
      {
        $push: {
          tokens: tokenObject as any
        }
      }
    ).exec();
  }

  findOneByProperty(property: Partial<IUser>): Promise<UserType | null> {
    return UserModel.findOne(property).exec();
  }

  findUserByActionToken(action: ActionEnum, token: string): Promise<UserType | null> {

    return UserModel.findOne({
      $and: [
        {'tokens.action': action},
        {'tokens.token': token}
      ]
    }).exec();
  }
  //TODO
  UpdateUserByPropertyOld(id: Partial<IUser>, property: Partial<IUser>): Promise<UserType> {
    return UserModel.updateOne(
      id,
      property,
      {new: true}
    ).exec();

  }

  UpdateUserByProperty(id: Partial<IUser>, property: Partial<IUser>): Promise<UserType | null> {
    return UserModel.findOneAndUpdate(
      id,
      property,
      {new: true}
    ).exec();
  }

  getAllUsers(): Promise<IUser[]> {
    return UserModel.find({}).exec();
  }
}

export const userService = new UserService();
