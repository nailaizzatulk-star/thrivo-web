import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'

function Catalog() {
  return (
    <>
      <Header />

      <main className="catalog-page">
        <section className="catalog-header">
          <p className="section-label">THE ARCHIVE</p>

          <h1>SHOP THE COLLECTION</h1>

          <p>
            Explore our curated selection of vintage and
            secondhand pieces.
          </p>
        </section>

        <section className="catalog-content">
          <div className="catalog-toolbar">
            <span>24 PIECES</span>

            <select>
              <option>SORT BY</option>
              <option>NEWEST</option>
              <option>PRICE: LOW TO HIGH</option>
              <option>PRICE: HIGH TO LOW</option>
            </select>
          </div>

          <div className="product-grid">
          <ProductCard
          id="1"
          category="OUTERWEAR"
          name="Camel Hair Double-Breasted Overcoat"
          price="Rp285.000"
          />

<ProductCard
id="2"
  category="KNITWEAR"
  name="Irish Aran Cable Knit Sweater"
  price="Rp225.000"
/>

<ProductCard
id="3"
  category="JACKET"
  name="A-2 Distressed Leather Flight Jacket"
  price="Rp295.000"
/>

<ProductCard
id="4"
  category="OUTERWEAR"
  name="Belgian Army Gabardine Trench"
  price="Rp250.000"
/>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Catalog