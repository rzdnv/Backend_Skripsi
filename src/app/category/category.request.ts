import Joi from "joi";
import { joiGeneralMessage } from "../../utils/joi";

export const createCategorySchema = Joi.object({
    title: Joi.string().required().messages(joiGeneralMessage),
})
