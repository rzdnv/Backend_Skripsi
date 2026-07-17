// import Joi from 'joi'

// import { joiGeneralMessage } from '../../utils/joi'

// export const createUserSchema = Joi.object({
//     username: Joi.string().required().pattern(/^[a-z0-9]+$/, 'lowercase letters and numbers')
//         .messages({
//             'string.pattern.base': 'Username hanya boleh berisi huruf kecil dan angka, tanpa spasi atau simbol',
//             ...joiGeneralMessage
//         }),
//     password: Joi.string().required().min(8).max(12).messages(joiGeneralMessage),
//     nama: Joi.string().required().messages(joiGeneralMessage),
//     telephone: Joi.string().required().messages(joiGeneralMessage),
//     type: Joi.string().messages(joiGeneralMessage),
// })

// export const checkUsernameUserSchema = Joi.object({
//     username: Joi.string().required().messages(joiGeneralMessage),
// })

// export const loginUserSchema = Joi.object({
//     username: Joi.string().required().messages(joiGeneralMessage),
//     password: Joi.string().required().min(8).max(12).messages(joiGeneralMessage),
// })

// export const logoutUserSchema = Joi.object({
//     token: Joi.string().required().messages(joiGeneralMessage),
// })
// export const updatePasswordUserSchema = Joi.object({
//     newPassword: Joi.string().required().messages(joiGeneralMessage),
// })
import Joi from "joi";
import { joiGeneralMessage } from "../../utils/joi";

export const createUserSchema = Joi.object({
  telephone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      ...joiGeneralMessage,
      'string.pattern.base': 'Nomor telepon harus berupa angka dan terdiri dari 10-15 digit',
    }),

  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages(joiGeneralMessage),

  code: Joi.string()
    .optional()
    .allow(null, '')
    .messages(joiGeneralMessage),

  divisionId: Joi.number()
    .required()
    .messages(joiGeneralMessage),
});
export const updateIsActiveUserSchema = Joi.object({
  isActive: Joi.boolean()
    .required()
    .messages(joiGeneralMessage),
});
