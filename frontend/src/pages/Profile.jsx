import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'

function Profile() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Ambil data user dari localStorage jika ada
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null

  useEffect(() => {
    const token = localStorage.getItem('token')

    // Jika belum login, redirect ke halaman login
    if (!token) {
      navigate('/login')
      return
    }

    // Fetch daftar item milik user yang sedang login
    fetch('http://localhost:5000/api/items/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const itemData = Array.isArray(data) ? data : (data.data || data.items || [])
        setItems(itemData)
      })
      .catch((err) => console.error('Failed to fetch user listings:', err))
      .finally(() => setLoading(false))
  }, [navigate])

  const listedCount = items.length
  const soldCount = items.filter((item) => item.status === 'SOLD').length

  return (
    <>
      <Header />

      <main className="profile-page">
        <section className="profile-container">

          <div className="profile-header">
            <p className="section-label">MY ACCOUNT</p>
            <h1>WELCOME BACK{user?.name ? `, ${user.name.toUpperCase()}` : ''}</h1>
            <p>
              Manage your listed pieces.
            </p>
          </div>

          <div className="profile-card">
            <p className="profile-card-label">MY ARCHIVE</p>

            <div className="profile-detail">
              <span>LISTED ITEMS</span>
              <strong>{listedCount} {listedCount === 1 ? 'PIECE' : 'PIECES'}</strong>
            </div>

            <div className="profile-detail">
              <span>SOLD ITEMS</span>
              <strong>{soldCount} {soldCount === 1 ? 'PIECE' : 'PIECES'}</strong>
            </div>

            <Link to="/sell" className="profile-button">
              SELL AN ITEM
            </Link>
          </div>

          <section className="my-listings">
            <div className="listings-header">
              <div>
                <p className="section-label">YOUR PIECES</p>
                <h2>MY LISTINGS</h2>
              </div>

              <Link to="/sell" className="listing-link">
                + LIST NEW ITEM
              </Link>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <p>LOADING YOUR ARCHIVE...</p>
              </div>
            ) : items.length > 0 ? (
              <div className="product-grid" style={{ marginTop: '20px' }}>
                {items.map((item) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    category={item.category}
                    name={item.title || item.name}
                    price={`Rp${item.sellingPrice ? item.sellingPrice.toLocaleString('id-ID') : '0'}`}
                    imageUrl={item.imageUrl || item.image || item.image_url}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-listings">
                <p>NO ITEMS LISTED YET.</p>
                <span>
                  Your listed pieces will appear here.
                </span>
              </div>
            )}
          </section>

        </section>
      </main>

      <Footer />
    </>
  )
}

export default Profile