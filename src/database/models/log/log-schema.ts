import {Document, model, Model, Schema} from 'mongoose';

import {TableNamesEnum} from '../../../constants';
import {ILog} from '../../../models';

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

