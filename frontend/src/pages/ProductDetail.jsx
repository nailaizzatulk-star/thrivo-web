import Header from '../components/Header'
import Footer from '../components/Footer'

function ProductDetail() {
  return (
    <>
      <Header />

      <main className="product-detail-page">
        <section className="product-detail">

          <div className="product-detail-image">
            IMAGE
          </div>

          <div className="product-detail-info">
            <p className="product-category">
              OUTERWEAR
            </p>

            <h1>
              Camel Hair Double-Breasted Overcoat
            </h1>

            <p className="product-detail-price">
              Rp285.000
            </p>

            <div className="product-detail-description">
              <p>
                A timeless vintage overcoat with a classic
                double-breasted silhouette.
              </p>
            </div>

            <div className="product-detail-meta">
              <div>
                <span>SIZE</span>
                <strong>M</strong>
              </div>

              <div>
                <span>CONDITION</span>
                <strong>VERY GOOD</strong>
              </div>

              <div>
                <span>ERA</span>
                <strong>1980s</strong>
              </div>
            </div>

            <button className="acquire-button">
              ACQUIRE PIECE
            </button>
          </div>

        </section>
      </main>

      <Footer />
    </>
  )
}

export default ProductDetail