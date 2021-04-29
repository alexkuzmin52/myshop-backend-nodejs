import {ActionEnum} from '../../constants';

export interface IUserToken {
  action: ActionEnum;
  token: string
}

export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  age: number;
  phone?: string;
  gender?: string;
  photo?: string;
  status: string;
  tokens?: [IUserToken];
  createdAt: string;
}
