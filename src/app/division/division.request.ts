import Joi from "joi";
import { joiGeneralMessage } from "../../utils/joi";

export const createDivisionSchema = Joi.object({
    title: Joi.string().required().messages(joiGeneralMessage),
})
