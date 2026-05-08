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