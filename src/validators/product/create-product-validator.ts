import * as Joi from 'joi';

import {ProductTypeEnum, RegexEnum} from '../../constants';

export const createProductValidator = Joi.object(
  {
    title: Joi
      .string()
      .trim()
      // .alphanum()
      .min(3)
      .max(50)
      .required(),
    accountingType: Joi
      .string()
      .trim()
      .valid(Object.values(ProductTypeEnum))
      .required(),
    brand: Joi
      .string()
      .trim()
      // .alphanum()
      .min(2)
      .max(30),
    category: Joi
      .string()
      .trim()
      // .alphanum()
      .min(2)
      .max(30)
      .required(),
    code: Joi
      .number()
      .integer()
      .min(0),
    countryOfManufacture: Joi
      .string()
      .trim()
      // .alphanum()
      .min(2)
      .max(30),
    discountFlag: Joi
      .boolean(),
    discount: Joi
      .number()
      .min(0)
      .max(99),
    originalPrice: Joi
      .number()
      .min(0.01)
      .max(99999),
    equipment: Joi
      .string()
      .trim()
      .min(0)
      .max(9999),
    fullCharacteristics: Joi
      .string()
      .trim()
      .min(0)
      .max(9999),
    fullDescription: Joi
      .string()
      .trim()
      .min(0)
      .max(9999),
    id: Joi
      .number()
      .integer()
      .min(0),
    newFlag: Joi
      .boolean(),
    overview_url: Joi
      .string()
      .regex(RegexEnum.url),
    packageAmount: Joi
      .number()
      .integer()
      .min(1),
    packageDimensions: Joi
      .object({
        length: Joi.number().min(0).max(12000).integer(),
        width: Joi.number().min(0).max(12000).integer(),
        height: Joi.number().min(0).max(12000).integer(),
        weight: Joi.number().min(0).max(12000).integer()
      }),
    itemDimensions: Joi
      .object({
        length: Joi.number().min(0).max(12000).integer(),
        width: Joi.number().min(0).max(12000).integer(),
        height: Joi.number().min(0).max(12000).integer(),
        weight: Joi.number().min(0).max(12000).integer()
      }),
    price: Joi
      .number()
      .min(0.01)
      .max(999999)
      .required(),
    promoFlag: Joi
      .boolean(),
    provider: Joi
      .string()
      .min(3)
      .max(50)
      .required(),
    shortCharacteristics: Joi
      .string()
      .trim()
      .min(0)
      .max(1000),
    shortDescription: Joi
      .string()
      .trim()
      .min(0)
      .max(100),
    stockCount: Joi
      .number()
      .integer()
      .min(1)
      .max(9999)
      .required(),
    storeCount: Joi
      .number()
      .integer()
      .min(1)
      .max(9999)
      .required()
  }
);
