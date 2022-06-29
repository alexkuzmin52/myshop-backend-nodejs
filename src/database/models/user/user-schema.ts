import {Document, model, Model, Schema} from 'mongoose';

import {IUser} from '../../../models';
import {TableNamesEnum, UserRoleEnum, UserStatusEnum} from '../../../constants';

export type UserType = IUser & Document

const tokensSubModel = {
  token: String,
  action: String
};

export const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: UserRoleEnum.USER
  },
  age: {
    type: Number,
    required: false
  },
  phone: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: false,
    default: ''
  },
  photo: {
    type: String,
    required: false,
    default: ''
  },
  status: {
    type: String,
    required: true,
    default: UserStatusEnum.PENDING
  },
  tokens: [tokensSubModel]
},
{
  timestamps: true
});

export const UserModel: Model<UserType> = model(TableNamesEnum.USER, UserSchema);
