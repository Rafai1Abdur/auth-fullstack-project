import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api/axios'

type User = {
  _id: string
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (user: User) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // 🔥 AUTO LOGIN (VERY IMPORTANT)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/me', {
          withCredentials: true
        })

        setUser(res.data.data)
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = async () => {
    await api.post('/logout', {}, { withCredentials: true })
    setUser(null)
  }

  return (
    <AuthContext.Provider value = {{ user, loading, login, logout }}>
      { children }
    </AuthContext.Provider>
  )
}

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}