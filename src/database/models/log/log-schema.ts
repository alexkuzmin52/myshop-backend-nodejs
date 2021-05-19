import {Document, model, Model, Schema} from 'mongoose';

import {ILog} from '../../../models';
import {TableNamesEnum} from '../../../constants';

export type LogType = ILog & Document;

export const LogSchema = new Schema({
  event: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  data: Schema.Types.Mixed
},
{
  timestamps: true
}
);

export const LogModel: Model<LogType> = model<LogType>(TableNamesEnum.LOGS, LogSchema);

