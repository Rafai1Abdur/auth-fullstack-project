import { useState } from 'react'
import { api } from '../api/axios'
import '../styles/auth.css'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [consent, setConsent] = useState(false)

  const handleRegister = async () => {
    try {
      const res = await api.post('/register', {
        name,
        email,
        phoneNumber,
        password,
        consent
      })

      console.log(res.data)
      alert('Check email for verification')
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
  <div className="auth-container">
    <div className="auth-card">
      <h2 className="auth-title">Register</h2>

      <input
        className="auth-input"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="auth-input"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="auth-input"
        placeholder="Phone Number"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <input
        className="auth-input"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="auth-checkbox-container">
      <input
        type="checkbox"
        className="auth-checkbox"
        onChange={(e) => setConsent(e.target.checked)}
      />
      <span>I agree to the terms and conditions</span>
      </div>
      
      <button className="auth-button" onClick={handleRegister}>
        Register
      </button>
    </div>
  </div>
)

}