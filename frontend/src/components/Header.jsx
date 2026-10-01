import { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <div className="announcement-bar">
        FREE SHIPPING ON ORDERS OVER Rp300.000
      </div>

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
          <Link to="/login">LOGIN</Link>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
          >
            SEARCH
          </button>

          <Link to="/cart">CART</Link>
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