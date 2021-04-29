import * as Joi from 'joi';

import {RegexEnum} from '../../constants';

export const passwordValidator = Joi.object(
  {
    password: Joi
      .string()
      .regex(RegexEnum.password)
      .required()
  }
);
