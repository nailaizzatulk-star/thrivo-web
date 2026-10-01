import Header from '../components/Header'
import Footer from '../components/Footer'

function Sell() {
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

          <form className="sell-form">

            <div className="image-upload">
              <div className="upload-placeholder">
                <span>+</span>
                <p>UPLOAD PRODUCT IMAGE</p>
                <small>JPG, PNG OR WEBP</small>
              </div>

              <input
                type="file"
                accept="image/*"
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">ITEM NAME</label>
              <input
                id="title"
                type="text"
                placeholder="E.G. VINTAGE WOOL OVERCOAT"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">CATEGORY</label>
              <select id="category" defaultValue="">
                <option value="" disabled>
                  SELECT CATEGORY
                </option>
                <option value="Outerwear">OUTERWEAR</option>
                <option value="Knitwear">KNITWEAR</option>
                <option value="Shirts">SHIRTS</option>
                <option value="Jackets">JACKETS</option>
                <option value="Bottoms">BOTTOMS</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">DESCRIPTION</label>
              <textarea
                id="description"
                rows="6"
                placeholder="DESCRIBE YOUR ITEM..."
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
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="condition">CONDITION</label>
              <select id="condition" defaultValue="">
                <option value="" disabled>
                  SELECT CONDITION
                </option>
                <option value="Like New">LIKE NEW</option>
                <option value="Very Good">VERY GOOD</option>
                <option value="Good">GOOD</option>
                <option value="Fair">FAIR</option>
              </select>
            </div>

            <button
              type="submit"
              className="auth-button"
            >
              LIST ITEM
            </button>

          </form>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Sell