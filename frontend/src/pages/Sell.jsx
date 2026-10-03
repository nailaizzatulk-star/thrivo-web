import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Sell() {
  const navigate = useNavigate()

  // State untuk form input
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    originalPrice: '',
    sellingPrice: '',
    condition: ''
  })

  // State untuk gambar & preview
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file)) // Tampilkan preview gambar
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please log in to list an item!')
      navigate('/login')
      return
    }

    if (!imageFile) {
      alert('Please upload a product image!')
      return
    }

    setLoading(true)

    try {
      // Gunakan FormData untuk mengirimkan file + teks
      const data = new FormData()
      data.append('image', imageFile) 
      data.append('title', formData.title)
      data.append('category', formData.category)
      data.append('description', formData.description)
      data.append('originalPrice', formData.originalPrice)
      data.append('sellingPrice', formData.sellingPrice)
      data.append('condition', formData.condition)

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/items`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      })

      const resData = await response.json()

      if (!response.ok) {
        throw new Error(resData.message || 'Failed to list item')
      }

      alert('Item listed successfully!')
      navigate('/profile') // Langsung redirect ke profile buat lihat barang yang baru diupload
    } catch (error) {
      console.error('Error listing item:', error)
      alert(error.message || 'An error occurred while uploading the item')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />

      <main className="sell-page">
        <section className="sell-container">

          <div className="sell-header">
            <p className="section-label">SELL YOUR PIECE</p>
            <h1>LIST AN ITEM</h1>
            <p>
              Give your pre-loved piece a new story.
            </p>
          </div>

          <form className="sell-form" onSubmit={handleSubmit}>

            <div className="image-upload">
              {imagePreview ? (
                <div className="upload-placeholder" style={{ padding: '10px' }}>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{ maxHeight: '180px', objectFit: 'contain', marginBottom: '10px' }} 
                  />
                  <p>CLICK TO CHANGE IMAGE</p>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <span>+</span>
                  <p>UPLOAD PRODUCT IMAGE</p>
                  <small>JPG, PNG OR WEBP</small>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">ITEM NAME</label>
              <input
                id="title"
                type="text"
                placeholder="E.G. VINTAGE WOOL OVERCOAT"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">CATEGORY</label>
              <select 
                id="category" 
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  SELECT CATEGORY
                </option>
                <option value="OUTERWEAR">OUTERWEAR</option>
                <option value="KNITWEAR">KNITWEAR</option>
                <option value="SHIRTS">SHIRTS</option>
                <option value="JACKET">JACKETS</option>
                <option value="BOTTOMS">BOTTOMS</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">DESCRIPTION</label>
              <textarea
                id="description"
                rows="6"
                placeholder="DESCRIBE YOUR ITEM AND PUT YOUR CONTACT NUMBER..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="price-grid">

              <div className="form-group">
                <label htmlFor="originalPrice">
                  ORIGINAL PRICE
                </label>
                <input
                  id="originalPrice"
                  type="number"
                  placeholder="E.G. 500000"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="sellingPrice">
                  SELLING PRICE
                </label>
                <input
                  id="sellingPrice"
                  type="number"
                  placeholder="E.G. 350000"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="condition">CONDITION</label>
              <select 
                id="condition" 
                value={formData.condition}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  SELECT CONDITION
                </option>
                <option value="LIKE NEW">LIKE NEW</option>
                <option value="VERY GOOD">VERY GOOD</option>
                <option value="GOOD">GOOD</option>
                <option value="FAIR">FAIR</option>
              </select>
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? 'UPLOADING...' : 'LIST ITEM'}
            </button>

          </form>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Sell