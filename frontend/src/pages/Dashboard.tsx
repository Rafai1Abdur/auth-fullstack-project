import { useAuth } from '../context/useAuth'

export default function Dashboard() {
    const { user, logout } = useAuth()

    const handleLogout = async () => {
        await logout()
    }

    if (!user) return null

    return (
        <div>
            <h1>Welcome {user.name}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}