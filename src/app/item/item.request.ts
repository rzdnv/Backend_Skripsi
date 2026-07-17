import Joi from "joi";
import { joiGeneralMessage } from "../../utils/joi";

export const createItemSchema = Joi.object({
  title: Joi.string().required().messages(joiGeneralMessage),
  code: Joi.string().required().messages(joiGeneralMessage),
  brand: Joi.string().allow(null, '').optional().messages(joiGeneralMessage),
  location: Joi.string().allow(null, '').optional().messages(joiGeneralMessage),
  supplier: Joi.string().allow(null, '').optional().messages(joiGeneralMessage),
  price: Joi.number().integer().required().messages(joiGeneralMessage),
  description: Joi.string().allow(null, '').optional().messages(joiGeneralMessage),
  unitId: Joi.number().integer().required().messages(joiGeneralMessage),
  typeId: Joi.number().integer().required().messages(joiGeneralMessage),
});
