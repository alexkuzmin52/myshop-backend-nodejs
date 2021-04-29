import * as Joi from 'joi';
import {RegexEnum} from '../../constants';

export const createSubCategoryValidator = Joi.object({
  title: Joi
    .string()
    .min(3)
    .max(60)
    .required(),
  overview_url: Joi
    .string()
    .regex(RegexEnum.url)
  // parentID: Joi
  //   .number()
  //   .required()

});
