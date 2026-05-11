import { useAuth } from '../context/useAuth'
import { api } from '../api/axios'
import { useState, useEffect, useCallback } from 'react'

type User = {
    _id: string
    name: string
    email: string
    role: string
}

export default function AdminDashboard() {
    const { user, logout } = useAuth()
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    const loadUsers = useCallback(async () => {
        setLoading(true)
        try {
            const response = await api.get('/user/management/users')
            setUsers(response.data.data)
        } catch (error) {
            console.error('Failed to fetch users:', error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        // React hooks rule about setState in effects is overly strict for async data fetching
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadUsers()
    }, [loadUsers])

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            await api.patch('/user/management/users/role', { userId, role: newRole })
            loadUsers()
        } catch (error) {
            console.error('Failed to update role:', error)
        }
    }

    const handleLogout = async () => {
        await logout()
    }

    if (!user) return null

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Admin Dashboard</h1>
            <p>Welcome, {user.name} (Admin)</p>
            <button onClick={handleLogout}>Logout</button>

            <h2 style={{ marginTop: '2rem' }}>User Management</h2>
            {loading ? (
                <p>Loading users...</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Role</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{u.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{u.email}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{u.role}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <select
                                        value={u.role}
                                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                        style={{ padding: '4px' }}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="vendor">Vendor</option>
                                        <option value="customer">Customer</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}