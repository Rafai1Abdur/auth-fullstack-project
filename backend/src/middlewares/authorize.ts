import { NextFunction, Request, Response } from 'express'
import { IAuthenticateRequest } from '../types/types'
import httpError from '../handlers/errorHandler/httpError'
import responseMessage from '../constant/responseMessage'

export const authorize = (...roles: string[]) => {
    return (request: Request, _response: Response, next: NextFunction) => {
        const req = request as IAuthenticateRequest

        if (!req.authenticatedUser) {
            return httpError(next, new Error(responseMessage.UNAUTHORIZED), request, 401)
        }

        if (!roles.includes(req.authenticatedUser.role)) {
            return httpError(next, new Error(responseMessage.FORBIDDEN), request, 403)
        }

        return next()
    }
}