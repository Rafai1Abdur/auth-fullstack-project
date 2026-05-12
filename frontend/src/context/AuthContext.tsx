import { useEffect, useState } from 'react'
import { api } from '../api/axios'
import { AuthContext, type User } from './AuthContextTypes'
import { useNavigate } from 'react-router-dom'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [viewAsRole, setViewAsRole] = useState<string | null>(null)
    const navigate = useNavigate()

    // Auto-login: fetch current user using httpOnly cookies and redirect
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
                    // Auto-redirect based on role
                    const role = res.data.data.role
                    if (role === 'admin') {
                        navigate('/admin', { replace: true })
                    } else if (role === 'vendor') {
                        navigate('/vendor', { replace: true })
                    } else if (role === 'customer') {
                        navigate('/dashboard', { replace: true })
                    }
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
    }, [navigate])

    const login = (userData: User) => {
        setUser(userData)
        setViewAsRole(null)
        // Auto-redirect based on role
        if (userData.role === 'admin') {
            navigate('/admin', { replace: true })
        } else if (userData.role === 'vendor') {
            navigate('/vendor', { replace: true })
        } else {
            navigate('/dashboard', { replace: true })
        }
    }

    const logout = async () => {
        try {
            localStorage.removeItem('accessToken')
            await api.post('/logout')
        } catch {
            // Ignore logout errors
        } finally {
            setUser(null)
            setViewAsRole(null)
            // Redirect to login page after logout
            navigate('/login', { replace: true })
        }
    }

    const switchRole = (role: string) => {
        if (!user) return
        
        // Role switching rules:
        // Admin: can switch to admin, vendor, customer
        // Vendor: can only switch to vendor, customer
        // Customer: no switching capability
        const allowedRoles = user.role === 'admin' 
            ? ['admin', 'vendor', 'customer']
            : user.role === 'vendor'
            ? ['vendor', 'customer']
            : []
        
        if (allowedRoles.includes(role)) {
            setViewAsRole(role)
            navigate(`/${role}`, { replace: true })
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, switchRole, viewAsRole }}>
            {children}
        </AuthContext.Provider>
    )
}