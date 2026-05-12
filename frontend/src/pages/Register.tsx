import { useState } from 'react'
import { api } from '../api/axios'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'

const passwordRequirements = [
    'Password Length needs to be at least 8 characters',
    'It must have Special character e.g @, $, !, %',
    'Must have numbers',
    'Have at least one capital letter'
]

export default function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [consent, setConsent] = useState(false)
    const [fieldError, setFieldError] = useState<string | null>(null)

    const validateField = (field: string, value: string): boolean => {
        switch (field) {
            case 'name':
                if (!value.trim()) {
                    setFieldError('Please Enter your name')
                    return false
                }
                if (value.trim().length < 2) {
                    setFieldError('Please enter your Full Name')
                    return false
                }
                return true
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(value)) {
                    setFieldError('Incorrect Email Format')
                    return false
                }
                return true
            case 'phoneNumber':
                const phoneRegex = /^92[0-9]{3}[0-9]{7,8}$/
                if (!phoneRegex.test(value)) {
                    setFieldError('Correct Number format: 92[Your Sim service][Your 7 or 8 digit number]')
                    return false
                }
                return true
            case 'password':
                const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                if (!passRegex.test(value)) {
                    setFieldError('Your password is missing a requirement')
                    return false
                }
                return true
            default:
                return true
        }
    }

    const handleRegister = async () => {
        setFieldError(null)

        // Validate all fields
        if (!validateField('name', name) || 
            !validateField('email', email) || 
            !validateField('phoneNumber', phoneNumber) ||
            !validateField('password', password)) {
            return
        }

        if (!consent) {
            setFieldError('Consent is not checked')
            return
        }

        try {
            await api.post('/register', {
                name,
                email,
                phoneNumber,
                password,
                consent
            })

            alert('Check email for verification')
            navigate('/login')
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } } }
            const message = error.response?.data?.message || 'Registration failed'
            setFieldError(message)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Register</h2>

                {fieldError && <div className="auth-error">{fieldError}</div>}

                <input
                    className="auth-input"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    onBlur={(e) => validateField('name', e.target.value)}
                />

                <input
                    className="auth-input"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => validateField('email', e.target.value)}
                />

                <input
                    className="auth-input"
                    placeholder="Phone Number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onBlur={(e) => validateField('phoneNumber', e.target.value)}
                />

                <input
                    className="auth-input"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={(e) => validateField('password', e.target.value)}
                />

                <div className="auth-password-requirements">
                    <strong>Password Requirements:</strong>
                    <ol style={{ margin: '5px 0 0 20px', color: '#94a3b8', fontSize: '12px' }}>
                        {passwordRequirements.map((req, i) => (
                            <li key={i}>{req}</li>
                        ))}
                    </ol>
                </div>

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