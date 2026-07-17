import * as operatorRepository from "./operator.repository";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { ERROR_CODE, IQueryParams } from "../../interface"
import { metaPagination } from "../../utils/meta-pagination";
import { AppError } from "../../middleware/error-handler";
import { IBodyCreateOperatorModel, IBodyLoginOperatorModel, IBodyUpdateOperatorModel } from "./operator.model";

dotenv.config()

// import { IBodyCreateUnitModel } from "./operator.model";

// export const updateUnit = async ({
//     body,
//     params: { unitId }
// }: {
//     body: IBodyCreateUnitModel,
//     params: { unitId?: string }

// }) => {

//     const cekDivision = await unitRepository.getUnitById({
//         unitId: Number(unitId)
//     })

//     if (!cekDivision) {
//         return new AppError(ERROR_CODE.NOT_FOUND.code, 'Division tidak ditemukan')
//     }

//     return await unitRepository.updateUnitById({
//         unitId: Number(unitId),
//         data: body,
//     })
// }

// export const createUnit = async ({
//     body,
// }: {
//     body: IBodyCreateUnitModel,
// }) => {
//     return await unitRepository.createUnit({
//         data: body,
//     })
// }

// export const getAllUnit = async ({
//     query
// }: {
//     query: IQueryParams
// }) => {
//     const { page = '1', perPage = '10' } = query

//     const data = await unitRepository.getAllUnit({
//         query
//     })

//     const count = await unitRepository.getCountAllUnit({
//         query
//     })

//     const meta = metaPagination(
//         Number(page),
//         Number(perPage),
//         data.length,
//         count,
//     )

//     return { data, meta }
// }


export const createOperator = async ({
    body
}: {
    body: IBodyCreateOperatorModel
}) => {
    const { email, password } = body

    const cekEmail = await operatorRepository.getOperatorByEmail({ email })

    if (cekEmail) {
        return new AppError(
            ERROR_CODE.BAD_REQUEST.code,
            'Email sudah digunakan',
        )
    }
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await operatorRepository.createOperator({
        data: {
            ...body,
            password: hashPassword,
        },
        adminRole: body.adminRole
    })


    if (!user) {
        return new AppError(
            ERROR_CODE.BAD_REQUEST.code,
            'User gagal dibuat',
        )
    }

    return { name: user?.name }
}
export const updateOperator = async ({
    body,
    operatorId
}: {
    body: IBodyUpdateOperatorModel
    operatorId: number
}) => {

    const operator = await operatorRepository.getOperatorById({ operatorId })

    if (!operator) {
        return new AppError(
            ERROR_CODE.NOT_FOUND.code,
            'Petugas tidak ditemukan',
        )
    }

    const user = await operatorRepository.updateOperator({
        data: { ...body},
        operatorId,
        adminRole: body.adminRole
    })

    return { name: user?.name }
}

export const loginOperator = async ({
    body
}: {
    body: IBodyLoginOperatorModel
}) => {
    const { email, password } = body
    const user = await operatorRepository.getOperatorByEmail({ email })

    if (!user) {
        return new AppError(
            ERROR_CODE.NOT_FOUND.code,
            'User tidak ditemukan',
        )
    }

    if (user.isActive === false) {
        return new AppError(
            ERROR_CODE.UNAUTHORIZED.code,
            'User tidak aktif, silakan hubungi administrator',
        )
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return new AppError(
            ERROR_CODE.UNAUTHORIZED.code,
            'Password tidak sesuai',
        )
    }

    const accessToken = jwt.sign(
        {
            name: user?.name,
            id: user.id,
            email: user?.email,
            telephone: user?.telephone,
            role: user?.adminRole
        },
        process.env.ACCESS_TOKEN || '',
        { expiresIn: '1d' }
    );

    return {
        token: accessToken,
    };
    // if (cekAccessToken) {
    //     const token = cekAccessToken.token;

    //     try {
    //         jwt.verify(token, process.env.ACCESS_TOKEN || '');

    //         return {
    //             token: cekAccessToken.token,
    //         };
    //     } catch (err: any) {
    //         if (err.name === 'TokenExpiredError') {
    //             await userRepository.deleteAccessToken(user.id);

    //             const newAccessToken = jwt.sign(
    //                 {
    //                     username: data.username,
    //                     id: user.id,
    //                     nama: user?.nama,
    //                     role: user?.userRole[0].role.nama
    //                 },
    //                 process.env.ACCESS_TOKEN || '',
    //                 { expiresIn: '1d' }
    //             );

    //             await userRepository.updateAccessToken({
    //                 userId: user.id,
    //                 token: newAccessToken,
    //             });

    //             return {
    //                 token: newAccessToken,
    //             };
    //         }

    //         throw new Error('Invalid token');
    //     }
    // } else {
    //     const accessToken = jwt.sign(
    //         {
    //             username: data.username,
    //             id: user.id,
    //             nama: user?.nama,
    //             role: user?.userRole[0].role.nama
    //         },
    //         process.env.ACCESS_TOKEN || '',
    //         { expiresIn: '1d' }
    //     );

    //     await userRepository.updateAccessToken({
    //         userId: user.id,
    //         token: accessToken,
    //     });



    //     return {
    //         token: accessToken,
    //     };
    // }

}

export const updateIsActive = async ({
    body,
    operatorId
}: {
    body: {
        isActive: boolean
    },
    operatorId: number
}) => {
    const { isActive } = body

    const user = await operatorRepository.getOperatorById({
        operatorId
    })

    if (!user) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Operator tidak ditemukan')
    }

    return await operatorRepository.updateIsActive({
        isActive,
        operatorId
    })
}

export const getAllOperator = async ({
    query
}: {
    query: IQueryParams
}) => {
    const { page = '1', perPage = '10' } = query
    const [data, count] = await Promise.all([
        operatorRepository.getAllOperator({
            query
        }),
        operatorRepository.getCountAllOperator({
            query
        }),
    ])
    const meta = metaPagination(
        Number(page),
        Number(perPage),
        data.length,
        count,
    )

    return { data, meta }
}