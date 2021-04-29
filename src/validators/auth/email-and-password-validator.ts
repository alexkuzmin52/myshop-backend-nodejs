import * as Joi from 'joi';

import {RegexEnum} from '../../constants';

export const emailAndPasswordValidator = Joi.object(
  {
    email: Joi
      .string()
      .regex(RegexEnum.email)
      .required(),
    password: Joi
      .string()
      .regex(RegexEnum.password)
      .required()
  }
);
