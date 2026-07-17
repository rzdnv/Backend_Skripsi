import { type Response, type NextFunction } from 'express'

import { ERROR_CODE } from '../interface'
import { AppError } from '../middleware/error-handler'

export const ResponseHandler = {
	ok<T, M = null>(res: Response, data: T, message = 'Success', meta?: M) {
		return res.status(200).json({ status: 'success', message, data, meta })
	},

	created<T>(res: Response, data: T, message = 'Created') {
		return res.status(201).json({ status: 'success', message, data })
	},

	badRequest(next: NextFunction, message = ERROR_CODE.BAD_REQUEST.message) {
		next(new AppError(ERROR_CODE.BAD_REQUEST.code, message))
	},

	internalServerError(
		next: NextFunction,
		message = ERROR_CODE.INTERNAL_SERVER_ERROR.message,
	) {
		next(new AppError(ERROR_CODE.INTERNAL_SERVER_ERROR.code, message))
	},

	unauthorized(next: NextFunction, message = ERROR_CODE.UNAUTHORIZED.message) {
		next(new AppError(ERROR_CODE.UNAUTHORIZED.code, message))
	},

	forbidden(next: NextFunction, message = ERROR_CODE.FORBIDDEN.message) {
		next(new AppError(ERROR_CODE.FORBIDDEN.code, message))
	},

	notFound(next: NextFunction, message = ERROR_CODE.NOT_FOUND.message) {
		next(new AppError(ERROR_CODE.NOT_FOUND.code, message))
	},

	methodNotAllowed(
		next: NextFunction,
		message = ERROR_CODE.METHOD_NOT_ALLOWED.message,
	) {
		next(new AppError(ERROR_CODE.METHOD_NOT_ALLOWED.code, message))
	},

	tooManyRequests(
		next: NextFunction,
		message = ERROR_CODE.TOO_MANY_REQUESTS.message,
	) {
		next(new AppError(ERROR_CODE.TOO_MANY_REQUESTS.code, message))
	},
}