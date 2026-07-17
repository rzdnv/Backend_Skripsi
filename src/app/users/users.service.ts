// import bcrypt from 'bcrypt';
// import dotenv from 'dotenv';
// import jwt from 'jsonwebtoken';
// import { ERROR_CODE, IJWTPayload } from '../../interface';
// import { AppError } from "../../middleware";
import * as userRepository from './users.repository';
import * as divisionRepository from '../division/division.repository'
// import { IBodyUser } from "./users.model";
// import { Response } from 'express';

import { ERROR_CODE, IQueryParams } from "../../interface"
import { metaPagination } from '../../utils/meta-pagination';
import { mapperUsers } from './users.mapper';
import { IBodyCreateUserModel } from './users.model';
import { AppError } from '../../middleware/error-handler';
import * as itemOutRepository from '../item-out/item-out.repository'

// dotenv.config()

// export const createUser = async (data: IBodyUser) => {

//     const cekUsername = await userRepository.checkUsernameExist(data.username)

//     if (cekUsername) {
//         return new AppError(
//             ERROR_CODE.BAD_REQUEST.code,
//             'Username sudah digunakan',
//         )
//     }
//     const salt = await bcrypt.genSalt()
//     const hashPassword = await bcrypt.hash(data.password, salt)

//     const role = await userRepository.getRole()
//     if (!role) {
//         return new AppError(
//             ERROR_CODE.BAD_REQUEST.code,
//             'Role tidak ditemukan',
//         )
//     }
//     const user = await userRepository.createUser(data, hashPassword)




//     if (!user) {
//         return new AppError(
//             ERROR_CODE.BAD_REQUEST.code,
//             'User gagal dibuat',
//         )
//     }

//     if (data?.type === 'admin') {
//         await userRepository.createUserRole(user.id, 2)
//     } else {
//         await userRepository.createUserRole(user.id, 3)
//     }

//     return { username: user?.username }
// }


// export const loginUser = async (data: IBodyUser, res: Response) => {
//     const user = await userRepository.getUserByUsername(data.username)

//     if (!user) {
//         return new AppError(
//             ERROR_CODE.NOT_FOUND.code,
//             'User tidak ditemukan',
//         )
//     }

//     const match = await bcrypt.compare(data.password, user.password)

//     if (!match) {
//         return new AppError(
//             ERROR_CODE.UNAUTHORIZED.code,
//             'Password tidak sesuai',
//         )
//     }

//     const cekAccessToken = await userRepository.getAccessToken(user.id);

//     const accessToken = jwt.sign(
//         {
//             username: data.username,
//             id: user.id,
//             nama: user?.nama,
//             role: user?.userRole[0].role.nama
//         },
//         process.env.ACCESS_TOKEN || '',
//         // { expiresIn: '1d' }
//     );

//     if (cekAccessToken) {
//         await userRepository.deleteAccessToken(user.id);
//     }

//     await userRepository.updateAccessToken({
//         userId: user.id,
//         token: accessToken,
//     });



//     return {
//         token: accessToken,
//     };
//     // if (cekAccessToken) {
//     //     const token = cekAccessToken.token;

//     //     try {
//     //         jwt.verify(token, process.env.ACCESS_TOKEN || '');

//     //         return {
//     //             token: cekAccessToken.token,
//     //         };
//     //     } catch (err: any) {
//     //         if (err.name === 'TokenExpiredError') {
//     //             await userRepository.deleteAccessToken(user.id);

//     //             const newAccessToken = jwt.sign(
//     //                 {
//     //                     username: data.username,
//     //                     id: user.id,
//     //                     nama: user?.nama,
//     //                     role: user?.userRole[0].role.nama
//     //                 },
//     //                 process.env.ACCESS_TOKEN || '',
//     //                 { expiresIn: '1d' }
//     //             );

//     //             await userRepository.updateAccessToken({
//     //                 userId: user.id,
//     //                 token: newAccessToken,
//     //             });

//     //             return {
//     //                 token: newAccessToken,
//     //             };
//     //         }

//     //         throw new Error('Invalid token');
//     //     }
//     // } else {
//     //     const accessToken = jwt.sign(
//     //         {
//     //             username: data.username,
//     //             id: user.id,
//     //             nama: user?.nama,
//     //             role: user?.userRole[0].role.nama
//     //         },
//     //         process.env.ACCESS_TOKEN || '',
//     //         { expiresIn: '1d' }
//     //     );

//     //     await userRepository.updateAccessToken({
//     //         userId: user.id,
//     //         token: accessToken,
//     //     });



//     //     return {
//     //         token: accessToken,
//     //     };
//     // }

// }

// export const logoutUser = async (data: { id: number }, res: Response) => {

//     const user = await userRepository.deleteAccessToken(data.id)

//     res.clearCookie('accessToken', {
//         httpOnly: true,
//         secure: true,
//         sameSite: 'none',
//     })
//     return user

// }


// export const checkUsernameExist = async (body: { username: string }) => {
//     return await userRepository.checkUsernameExist(body.username)
// }

// export const getProfile = async (body: IJWTPayload) => {

//     const user = await userRepository.getUserById(body.id)

//     if (!user) {
//         return new AppError(
//             ERROR_CODE.NOT_FOUND.code,
//             'User tidak ditemukan',
//         )
//     }

//     return user
// }

export const getAllUser = async ({
    query
}: {
    query: IQueryParams
}) => {
    const { page = '1', perPage = '10' } = query

    const data = await userRepository.getAllUser({
        query
    })

    const count = await userRepository.getCountAllUser({
        query
    })

    const meta = metaPagination(
        Number(page),
        Number(perPage),
        data.length,
        count,
    )

    return { data: mapperUsers(data), meta }
}

export const updateIsActive = async ({
    body,
    userId
}: {
    body: {
        isActive: boolean
    },
    userId: number
}) => {
    const { isActive } = body

    const user = await userRepository.getUserById({
        userId
    })

    if (!user) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'User tidak ditemukan')
    }

    return await userRepository.updateIsActive({
        isActive,
        userId
    })
}

export const createUser = async ({
    body
}: {
    body: IBodyCreateUserModel

}) => {
    const { divisionId, telephone } = body

    const cekDivision = await divisionRepository.getDivisionById({
        divisionId: Number(divisionId)
    })

    if (!cekDivision) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Division tidak ditemukan')
    }

    const cekUser = await userRepository.getUserByTelephone({
        telephone
    })

    if (cekUser) {
        return new AppError(ERROR_CODE.BAD_REQUEST.code, 'Nomor telephone sudah terdaftar')
    }

    return await userRepository.createUser({
        data: body
    })
}
export const updateUser = async ({
    body,
    userId
}: {
    body: IBodyCreateUserModel
    userId: number

}) => {
    const { divisionId, telephone } = body

    const user = await userRepository.getUserById({
        userId
    })

    if (!user) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'User tidak ditemukan')
    }

    const cekDivision = await divisionRepository.getDivisionById({
        divisionId: Number(divisionId)
    })

    if (!cekDivision) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Division tidak ditemukan')
    }

    const cekUser = await userRepository.getUserByTelephone({
        telephone
    })

    if (cekUser && cekUser.id !== userId) {
        return new AppError(ERROR_CODE.BAD_REQUEST.code, 'Nomor telephone sudah terdaftar')
    }

    return await userRepository.updateUser({
        userId,
        data: body
    })
}

export const getTopUser = async () => {
    const item = await itemOutRepository.getCountAllItemOutInMount()
    const user =await userRepository.getTopUser()
    return {
        item,
        user
    }
}