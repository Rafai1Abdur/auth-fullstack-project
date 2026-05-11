import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

type ProtectedRouteProps = {
    children: React.ReactNode
    requiredRole?: string[]
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth()

    if (loading) return <div>Loading...</div>

    if (!user) return <Navigate to="/login" replace />

    return <>{children}</>
}