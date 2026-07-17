import Joi from "joi";
import { joiGeneralMessage } from "../../utils/joi";

export const createUnitSchema = Joi.object({
    title: Joi.string().required().messages(joiGeneralMessage),
})
