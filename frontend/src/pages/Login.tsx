import { useState } from 'react'
import { api } from '../api/axios'
import { useAuth } from '../context/useAuth'
import '../styles/auth.css'

export default function Login() {
    const { login } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async () => {
        setError(null)
        try {
            const res = await api.post('/login', { email, password })

            const { user } = res.data.data
            const { accessToken } = res.data.data

            if (accessToken) {
                localStorage.setItem('accessToken', accessToken)
            }

            login(user)
        } catch {
            setError('Your Email or Password is incorrect')
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Login</h2>

                {error && <div className="auth-error">{error}</div>}

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