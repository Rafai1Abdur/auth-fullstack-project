import { useState } from 'react'
import { api } from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import '../styles/auth.css'

type AxiosError = {
    response?: {
        data?: {
            message?: string
        }
    }
}

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const res = await api.post('/login', { email, password })

            // Backend returns: { data: { success, user, accessToken, refreshToken } }
            const { user } = res.data.data
            const { accessToken } = res.data.data

            // Store access token for authenticated requests
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken)
            }

            login(user)
            navigate('/dashboard')
        } catch (err) {
            const error = err as AxiosError
            alert(error.response?.data?.message || 'Login failed')
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

