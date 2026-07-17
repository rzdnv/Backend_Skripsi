import Joi from "joi";
import { joiGeneralMessage } from "../../utils/joi";
import { NEWS } from "@prisma/client";

export const createItemOutSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .required()
    .messages(joiGeneralMessage),

  userId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages(joiGeneralMessage),

  news: Joi.string()
    .valid(...Object.values(NEWS))
    .required()
    .messages({
      ...joiGeneralMessage,
      'any.only': `Nilai news hanya boleh salah satu dari: ${Object.values(NEWS).join(', ')}`,
    }),

  itemId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages(joiGeneralMessage),
});
