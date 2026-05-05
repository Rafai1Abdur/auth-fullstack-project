import { api } from './axios'

export const loginApi = async (data: { email: string; password: string }) => {
  return api.post('/login', data)
}

export const registerApi = async (data: { email: string; password: string }) => {
  return api.post('/register', data)
}
