import { createContext } from 'react'

export type User = {
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
    switchRole: (role: string) => void
    viewAsRole: string | null
}

export const AuthContext = createContext<AuthContextType | null>(null)