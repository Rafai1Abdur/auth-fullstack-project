import { useAuth } from '../context/useAuth'

export default function VendorDashboard() {
    const { user, logout } = useAuth()

    const handleLogout = async () => {
        await logout()
    }

    if (!user) return null

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Vendor Dashboard</h1>
            <p>Welcome, {user.name} (Vendor)</p>
            <button onClick={handleLogout}>Logout</button>
            <p style={{ marginTop: '2rem' }}>Vendor features coming soon...</p>
        </div>
    )
}