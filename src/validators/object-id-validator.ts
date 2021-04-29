import * as Joi from 'joi';
import {RegexEnum} from '../constants';

export const objectIdValidator = Joi.object({
  param: Joi
    .string()
    .regex(RegexEnum.id)
    .required()
});
