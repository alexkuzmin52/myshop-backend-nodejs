import * as Joi from 'joi';

export const AddReviewValidator = Joi.object({
  comment: Joi
    .string()
    .min(2)
    .max(256)
    .required(),
  rating: Joi
    .number()
    .integer()
    .min(1)
    .max(5)
});
