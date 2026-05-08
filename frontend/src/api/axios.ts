import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3000/v1',
    withCredentials: true
})

// Add access token from localStorage to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Handle 401 errors - redirect to login (only if not already there)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
            localStorage.removeItem('accessToken')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)