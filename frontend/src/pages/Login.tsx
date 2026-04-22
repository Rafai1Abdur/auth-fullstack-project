import { useState } from 'react'
import { loginApi } from '../api/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const res = await loginApi({ email, password })

      console.log('LOGIN SUCCESS:', res.data)

      alert('Login successful')

      navigate('/dashboard')
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div>
      <h1>LOGIN</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}