import { api } from './axios'

export const loginApi = async (data: { email: string; password: string }) => {
    return api.post('/login', data)
}

export const registerApi = async (data: {
    name: string
    email: string
    phoneNumber: string
    password: string
    consent: boolean
}) => {
    return api.post('/register', data)
}

export const getAllUsersApi = async () => {
    return api.get('/user/management/users')
}

export const updateUserRoleApi = async (userId: string, role: string) => {
    return api.patch('/user/management/users/role', { userId, role })
}