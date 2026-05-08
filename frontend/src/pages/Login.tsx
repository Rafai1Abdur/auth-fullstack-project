import { useState } from 'react'
import { loginApi } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const res = await loginApi({ email, password })

      console.log('LOGIN SUCCESS:', res.data)

      window.location.href = '/dashboard'

       // ✅ SAVE TOKEN (THIS IS THE MISSING PIECE)
      localStorage.setItem('accessToken', res.data.data.accessToken)

      alert('Login successful')

      login(res.data.user)
      
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed')
    }
  }

  return (
  <div className="auth-container">
    <div className="auth-card">
      <h2 className="auth-title">Login</h2>

      <input
        className="auth-input"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="auth-input"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="auth-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  </div>
      )
}

