import { useState } from 'react'
import { api } from '../api/axios'

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
    <div>
      <h2>Register</h2>
      // Name is required, min 2 chars, max 72 chars
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      
      // Email is required, must be valid email format
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      
      // Password is required, min 8 chars, max 24 chars, must contain uppercase, lowercase, number, special char
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      
      // Phone number is required, min 4 chars, max 20 chars
      <input placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
      
      // Consent Checkbar
      <label>
        <input
    type="checkbox"
    onChange={(e) => setConsent(e.target.checked)}
            />
             I agree to terms
        </label>
      
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}