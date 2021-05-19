import {Document, Model, model, Schema} from 'mongoose';

import {IAuth} from '../../../models';
import {TableNamesEnum} from '../../../constants';

export type AuthType = IAuth & Document;

export const AuthSchema = new Schema({
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: TableNamesEnum.USER
  }
},
{
  timestamps: true
});

export const AuthModel: Model<AuthType> = model(TableNamesEnum.AUTH, AuthSchema);
