import { NextFunction, Request, Response } from 'express'
import httpResponse from '../../../handlers/httpResponse'
import responseMessage from '../../../constant/responseMessage'
import httpError from '../../../handlers/errorHandler/httpError'
import { CustomError } from '../../../utils/errors'
import { IMyUser } from './types/management.interface'
import { getAllUsersService, updateUserRoleService } from './management.service'
import { EUserRoles } from '../../../constant/users'

export default {
    me: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { authenticatedUser } = request as unknown as IMyUser
            httpResponse(response, request, 200, responseMessage.SUCCESS, authenticatedUser)
        } catch (error) {
            if (error instanceof CustomError) {
                httpError(next, error, request, error.statusCode)
            } else {
                httpError(next, error, request, 500)
            }
        }
    },
    getAllUsers: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const users = await getAllUsersService()
            httpResponse(response, request, 200, responseMessage.SUCCESS, users)
        } catch (error) {
            if (error instanceof CustomError) {
                httpError(next, error, request, error.statusCode)
            } else {
                httpError(next, error, request, 500)
            }
        }
    },
    updateUserRole: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { userId, role } = request.body as { userId: string; role: EUserRoles }
            
            if (!userId || !role) {
                return httpError(next, new CustomError('User ID and role are required', 400), request, 400)
            }
            
            if (!Object.values(EUserRoles).includes(role)) {
                return httpError(next, new CustomError('Invalid role', 400), request, 400)
            }
            
            const updatedUser = await updateUserRoleService(userId, role)
            if (!updatedUser) {
                return httpError(next, new CustomError('User not found', 404), request, 404)
            }
            
            httpResponse(response, request, 200, 'User role updated successfully', updatedUser)
        } catch (error) {
            if (error instanceof CustomError) {
                httpError(next, error, request, error.statusCode)
            } else {
                httpError(next, error, request, 500)
            }
        }
    }
}