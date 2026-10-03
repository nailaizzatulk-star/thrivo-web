import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

 useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Failed to create account')
      }

      alert('Account created successfully! Please log in first.')
      navigate('/login') // Redirect to login page after successful registration
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />

      <main className="auth-page">
        <section className="auth-container">
          <div className="auth-header">
            <p className="section-label">JOIN THE ARCHIVE</p>
            <h1>CREATE YOUR ACCOUNT</h1>
            <p>
              Create an account to buy and sell pieces on THRIVO.
            </p>
          </div>

          {error && (
            <p style={{ color: '#d9534f', textAlign: 'center', marginBottom: '15px', fontSize: '0.9rem' }}>
              {error}
            </p>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">NAME</label>
              <input
                id="name"
                type="text"
                placeholder="YOUR NAME"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                id="email"
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <input
                id="password"
                type="password"
                placeholder="CREATE A PASSWORD"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p className="auth-switch">
            ALREADY HAVE AN ACCOUNT? <Link to="/login">LOGIN</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Register