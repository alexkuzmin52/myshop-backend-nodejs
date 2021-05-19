import * as autoIncrement from 'mongoose-auto-increment';
import * as mongoose from 'mongoose';
import {Document, model, Model, Schema} from 'mongoose';

import {ISubSubCategory} from '../../../models';
import {TableNamesEnum} from '../../../constants';
import {config} from '../../../config';

export type SubSubCategoryType = ISubSubCategory & Document;

export const SubSubCategorySchema = new Schema<ISubSubCategory>({
  id: {
    type: {type: Number}
  },
  parentID: {
    type: Number,
    default: -1
  },
  title: {
    type: String,
    required: true,
    default: 'subSubCategory'
  },
  overview_url: {
    type: String,
    default: 'http://www.google.com'
  },
  logo: {
    type: String,
    default: ''
  }
});

autoIncrement.initialize(mongoose.connection);

SubSubCategorySchema.plugin(autoIncrement.plugin, {
  model: 'SubSubCategoryModel',
  field: 'id',
  startAt: config.START_NUMBER_SUB_SUB_CATEGORY_ID,
  incrementBy: 1
});

export const SubSubCategoryModel: Model<SubSubCategoryType> = model(TableNamesEnum.SUBSUBCATEGORIES, SubSubCategorySchema);
