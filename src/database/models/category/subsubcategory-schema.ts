import {Document, model, Model, Schema} from 'mongoose';
import {TableNamesEnum} from '../../../constants';
import {ISubSubCategory} from '../../../models';
import * as autoIncrement from 'mongoose-auto-increment';
import * as mongoose from 'mongoose';

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
  startAt: 3000,
  incrementBy: 1
});

export const SubSubCategoryModel: Model<SubSubCategoryType> = model(TableNamesEnum.SUBSUBCATEGORIES, SubSubCategorySchema);
