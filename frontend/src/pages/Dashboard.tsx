import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div>
      <h1>Welcome {user?.name}</h1>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}