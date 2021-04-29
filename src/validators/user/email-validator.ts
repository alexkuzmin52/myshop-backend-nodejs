import * as Joi from 'joi';

import {RegexEnum} from '../../constants';

export const emailValidator = Joi.object(
  {
    email: Joi
      .string()
      .regex(RegexEnum.email)
      .required()
  }
);
