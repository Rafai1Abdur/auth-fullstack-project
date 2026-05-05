import { api } from './axios'

export const loginApi = async (data: { email: string; password: string }) => {
  return api.post('/login', data, { withCredentials: true })
}

export const registerApi = async (data: { email: string; password: string }) => {
  return api.post('/register', data)
}

export const meApi = async () => {
  return api.get('/me', { withCredentials: true })
}

export const logoutApi = async () => {
  return api.post('/logout', {}, { withCredentials: true })
}
