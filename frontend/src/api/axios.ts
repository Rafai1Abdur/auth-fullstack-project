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
// Skip redirect for /me endpoint as it's used for auth checking
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Skip redirect if:
        // 1. Already on login page
        // 2. The request was to /me endpoint (auth check)
        // 3. The request was to refresh token endpoint
        const isAuthCheck = error.config?.url?.includes('/me')
        const isRefreshToken = error.config?.url?.includes('/refresh-token')
        
        if (error.response?.status === 401 && 
            !window.location.pathname.includes('/login') && 
            !isAuthCheck && 
            !isRefreshToken) {
            localStorage.removeItem('accessToken')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)