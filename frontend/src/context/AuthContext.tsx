import { useEffect, useState } from 'react'
import { api } from '../api/axios'
import { AuthContext, type User } from './AuthContextTypes'
import { useNavigate } from 'react-router-dom'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    // Auto-login: fetch current user using httpOnly cookies
    useEffect(() => {
        let isMounted = true
        let hasCheckedAuth = false
        
        const checkAuth = async () => {
            if (hasCheckedAuth) return
            hasCheckedAuth = true
            
            try {
                const res = await api.get('/me')
                if (isMounted) {
                    setUser(res.data.data)
                }
            } catch {
                if (isMounted) {
                    setUser(null)
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        checkAuth()
        
        return () => {
            isMounted = false
        }
    }, [])

    const login = (userData: User) => {
        setUser(userData)
    }

    const logout = async () => {
        try {
            localStorage.removeItem('accessToken')
            await api.post('/logout')
        } catch {
            // Ignore logout errors
        } finally {
            setUser(null)
            // Redirect to login page after logout
            navigate('/login', { replace: true })
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}