import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

type ProtectedRouteProps = {
    children: React.ReactNode
    requiredRoles?: string[]
}

export default function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
    const { user, loading } = useAuth()

    if (loading) return <div>Loading...</div>

    if (!user) return <Navigate to="/login" replace />

    if (requiredRoles && !requiredRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return <>{children}</>
}