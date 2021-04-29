import * as Joi from 'joi';

import {GenderEnum, RegexEnum} from '../../constants';

export const createUserValidator = Joi.object({
  name: Joi
    .string()
    .trim()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  surname: Joi
    .string()
    .trim()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi
    .string()
    .trim()
    .regex(RegexEnum.email)
    .required(),
  password: Joi
    .string()
    .trim()
    .regex(RegexEnum.password)
    .required(),
  phone: Joi
    .string()
    .trim()
    .regex(RegexEnum.phone)
    .required(),
  gender: Joi
    .string()
    .trim()
    .valid(GenderEnum.MALE, GenderEnum.FEMALE),
  // .required(),
  age: Joi
    .number()
    .min(5)
    .max(115)
    .required(),
  photo: Joi
    .string()
});
