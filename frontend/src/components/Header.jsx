import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('') // State untuk menyimpan keyword
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

  // Fungsi untuk menangani saat user menekan Enter
  const handleSearch = (e) => {
    e.preventDefault() // Mencegah page reload
    if (searchTerm.trim()) {
      // Arahkan ke halaman catalog dengan query parameter search
      navigate(`/catalog?search=${encodeURIComponent(searchTerm.trim())}`)
      setSearchOpen(false) // Tutup search bar setelah enter
      setSearchTerm('') // Kosongkan input kembali
    }
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
          {/* Bungkus input dengan form agar bisa mendeteksi tombol Enter */}
          <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="SEARCH THE ARCHIVE..."
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1 }}
            />

            <button
              type="button"
              onClick={() => setSearchOpen(false)}
            >
              CLOSE
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Header