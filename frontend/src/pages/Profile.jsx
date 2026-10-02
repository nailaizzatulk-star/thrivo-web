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

  // Fungsi untuk update status barang via API PATCH
  const handleToggleStatus = async (itemId, currentStatus) => {
    const token = localStorage.getItem('token')
    if (!token) return

    // Tentukan status baru kebalikan dari status saat ini
    const newStatus = currentStatus === 'Available' ? 'Sold' : 'Available'

    try {
      const response = await fetch(`http://localhost:5000/api/items/${itemId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: newStatus
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Gagal mengubah status barang')
      }

      // Update state item secara lokal biar UI langsung berubah tanpa refresh
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, status: newStatus } : item
        )
      )
    } catch (error) {
      console.error('Error updating status:', error)
      alert(error.message || 'Terjadi kesalahan saat mengubah status')
    }
  }

  const listedCount = items.length
  const soldCount = items.filter((item) => item.status && item.status.toUpperCase() === 'SOLD').length

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
               
                  <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ProductCard
                      id={item.id}
                      category={item.category}
                      name={item.title || item.name}
                      price={`Rp${item.sellingPrice ? item.sellingPrice.toLocaleString('id-ID') : '0'}`}
                      imageUrl={item.imageUrl || item.image || item.image_url}
                    />
                    
                    {/* Tombol Toggle Status */}
                    <button
                      onClick={() => handleToggleStatus(item.id, item.status)}
                      style={{
                        padding: '10px',
                        backgroundColor: item.status === 'Available' ? '#111' : '#e0e0e0',
                        color: item.status === 'Available' ? '#fff' : '#555',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                        transition: '0.3s'
                      }}
                    >
                      {item.status === 'Available' ? 'MARK AS SOLD' : 'MARK AS AVAILABLE'}
                    </button>
                  </div>
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