import { EUserRoles } from '../../../../constant/users'
import { Types } from 'mongoose'

export interface IUser {
    _id?: Types.ObjectId
    name: string
    email: string
    phoneNumber: {
        isoCode: string
        countryCode: string
        internationalNumber: string
    }
    timezone: string
    password: string
    role: EUserRoles
    accountConfimation: {
        status: boolean
        token: string
        code: string
        timestamp: Date | null
    }
    passwordReset: {
        token: string | null
        expiry: number | null
        lastResetAt: Date | null
    }
    lastLoginAt: Date | null
    consent: boolean
}
/*
export interface IUserWithId extends IUser {
    _id: string
}
*/

// This type is used to return user data without the ObjectId type, making it easier to work with in the frontend
export type IUserResponse = Omit<IUser, '_id'> & { _id: string }