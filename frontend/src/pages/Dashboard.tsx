import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Dashboard</h1>

        <p className="dashboard-text">
          Welcome! You are successfully logged in 🎉
        </p>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}