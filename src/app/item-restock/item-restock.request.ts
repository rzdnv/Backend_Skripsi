import Joi from "joi";
import { joiGeneralMessage } from "../../utils/joi";
import { NEWS } from "@prisma/client";

export const createItemRestockSchema = Joi.object({
    itemId: Joi.number().required().messages(joiGeneralMessage),
    amount: Joi.number()
        .min(1)
        .required()
        .messages({
            ...joiGeneralMessage,
            'number.min': 'Jumlah restock harus lebih dari 0',
        }),
    description: Joi.string()
        .allow('', null)
        .max(255)
        .messages(joiGeneralMessage),

    news: Joi.string()
        .valid(...Object.values(NEWS))
        .required()
        .messages(joiGeneralMessage),
});