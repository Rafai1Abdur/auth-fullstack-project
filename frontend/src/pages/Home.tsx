import { Link } from 'react-router-dom'
import '../styles/auth.css'

export default function Home() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Welcome to Our Store</h1>
                <p style={{ marginBottom: '2rem' }}>Your one-stop shop for everything you need</p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/login">
                        <button className="auth-button">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="auth-button">Register</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}