import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { type NextFunction, type Request, type Response } from 'express'
import {  DecodedToken, ERROR_CODE, IJWTPayload } from '../interface'
import { logger } from '../setup/logging'

dotenv.config()

export const verifyToken = (req: Request,
    res: Response,
    next: NextFunction,) => {

    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res
            .status(401)
            .json({
                status: 'error', error: {
                    code: ERROR_CODE.UNAUTHORIZED.code,
                    message: 'Unauthorized',
                }
            })
    }

    const secret = process.env.ACCESS_TOKEN || ''


    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            return res
                .status(403)
                .json({
                    status: 'error', error: {
                        code: ERROR_CODE.FORBIDDEN.code,
                        message: 'Forbidden',
                    }
                })
        }



        // if (typeof decoded === "object" && "gid" in decoded) {
        //     req.token = { gid: decoded.gid as string }; // Assign nilai gid ke token
        //   }
        req.token = decoded as any

        // req.body = { ...decoded, ...req.body }
        // req.token
        next()
    })
}

// const cekSession = await userRepository.getAccessToken(decoded.id)
// console.log('session;,', cekSession)
// if (!cekSession) {
//     return res
//         .status(401)
//         .json({
//             status: 'error', error: {
//                 code: ERROR_CODE.UNAUTHORIZED.code,
//                 message: 'Unauthorized',
//             }
//         })
// }