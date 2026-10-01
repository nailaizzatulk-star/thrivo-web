import Header from '../components/Header'
import Footer from '../components/Footer'

function Cart() {
  return (
    <>
      <Header />

      <main className="cart-page">
        <section className="cart-container">

          <div className="cart-header">
            <p className="section-label">YOUR SELECTION</p>
            <h1>SHOPPING CART</h1>
          </div>

          <div className="cart-content">

            <div className="cart-items">
              <div className="cart-item">

                <div className="cart-item-image">
                  IMAGE
                </div>

                <div className="cart-item-info">
                  <p className="product-category">
                    OUTERWEAR
                  </p>

                  <h2>
                    Camel Hair Double-Breasted Overcoat
                  </h2>

                  <p className="cart-item-price">
                    Rp285.000
                  </p>

                  <button className="remove-item">
                    REMOVE
                  </button>
                </div>

              </div>
            </div>

            <aside className="cart-summary">
              <p className="summary-label">ORDER SUMMARY</p>

              <div className="summary-row">
                <span>SUBTOTAL</span>
                <strong>Rp285.000</strong>
              </div>

              <div className="summary-row">
                <span>SHIPPING</span>
                <strong>CALCULATED AT CHECKOUT</strong>
              </div>

              <div className="summary-total">
                <span>TOTAL</span>
                <strong>Rp285.000</strong>
              </div>

              <button className="checkout-button">
                PROCEED TO CHECKOUT
              </button>
            </aside>

          </div>

        </section>
      </main>

      <Footer />
    </>
  )
}

export default Cart