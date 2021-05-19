import * as autoIncrement from 'mongoose-auto-increment';
import * as mongoose from 'mongoose';
import {Document, model, Model, Schema} from 'mongoose';

import {ISubCategory} from '../../../models';
import {SubSubCategorySchema} from './subsubcategory-schema';
import {TableNamesEnum} from '../../../constants';
import {config} from '../../../config';

export type SubCategoryType = ISubCategory & Document;

export const SubCategorySchema = new Schema<ISubCategory>({
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
    default: 'subCategory'
  },
  overview_url: {
    type: String,
    default: 'http://www.google.com'
  },
  logo: {
    type: String,
    default: ''
  },
  subSubCategories: {type: [SubSubCategorySchema], excludeIndexes: true}

});

autoIncrement.initialize(mongoose.connection);

SubCategorySchema.plugin(autoIncrement.plugin, {
  model: 'SubCategoryModel',
  field:'id',
  startAt: config.START_NUMBER_SUB_CATEGORY_ID,
  incrementBy: 1
});

export const SubCategoryModel: Model<SubCategoryType> = model(TableNamesEnum.SUBCATEGORIES, SubCategorySchema);
