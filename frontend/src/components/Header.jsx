import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()

  // Ambil data user dari localStorage
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    alert('Logged out successfully')
    navigate('/login')
  }

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          THRIVO
        </Link>

        <nav className="navigation">
          <Link to="/catalog">SHOP</Link>
          <Link to="/sell">SELL</Link>
          <Link to="/profile">ACCOUNT</Link>
        </nav>

        <div className="header-actions">
          {/* Jika user sudah login tampilkan LOGOUT, jika belum tampilkan LOGIN */}
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="logout-btn"
            >
              LOGOUT
            </button>
          ) : (
            <Link to="/login">LOGIN</Link>
          )}

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
          >
            SEARCH
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="SEARCH THE ARCHIVE..."
            autoFocus
          />

          <button
            type="button"
            onClick={() => setSearchOpen(false)}
          >
            CLOSE
          </button>
        </div>
      )}
    </>
  )
}

export default Header