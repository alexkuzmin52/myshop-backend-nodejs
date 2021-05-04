import * as autoIncrement from 'mongoose-auto-increment';
import * as mongoose from 'mongoose';
import {Document, Model, model, Schema} from 'mongoose';

import {ICategory} from '../../../models';
import {TableNamesEnum} from '../../../constants';
import {SubCategorySchema} from './subcategory-schema';

export type CategoryType = ICategory & Document;
export const CategorySchema = new Schema<ICategory>({
  id: {
    type: Number,
    required: true
    // unique: true
  },
  title: {
    type: String,
    required: true
  },
  parentID: {
    type: Number,
    default: 0
  },
  overview_url: {
    type: String,
    default: 'http://www.google.com'
  },
  logo: {
    type: String,
    default: ''
  },
  subCategories: {type:[SubCategorySchema], excludeIndexes: true}
},
{timestamps: true}
);

autoIncrement.initialize(mongoose.connection);
CategorySchema.plugin(autoIncrement.plugin, {
  model: 'CategoryModel',
  field: 'id',
  startAt: 1000,
  incrementBy: 1
});

export const CategoryModel: Model<CategoryType> = model(TableNamesEnum.CATEGORIES, CategorySchema);

