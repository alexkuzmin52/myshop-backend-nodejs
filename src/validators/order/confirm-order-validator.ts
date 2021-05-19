import * as Joi from 'joi';

import {OrderDeliveryEnum, OrderPaymentMethodEnum, RegexEnum} from '../../constants';

export const confirmOrderValidator = Joi.object(
  {
    paymentMethod: Joi
      .string()
      .trim()
      .valid(Object.values(OrderPaymentMethodEnum))
      .required(),
    reasonForReturning: Joi
      .string()
      .trim()
      .alphanum()
      .min(2)
      .max(60),
    delivery: Joi
      .string()
      .trim()
      .valid(Object.values(OrderDeliveryEnum))
      .required(),
    address: Joi
      .string()
      .trim()
      // .alphanum()
      .min(2)
      .max(60)
      .required(),
    phone: Joi
      .string()
      .trim()
      .regex(RegexEnum.phone)
      .required(),
    city: Joi
      .string()
      .trim()
      .alphanum()
      .min(2)
      .max(30)
      .required()
  }
);
