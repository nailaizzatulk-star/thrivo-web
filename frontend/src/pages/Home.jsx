import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import Newsletter from '../components/Newsletter'

function Home() {
  return (
    <div>
      <Header />
  
        <section className="hero">
          <div className="hero-content">
            <p className="hero-label">CURATED VINTAGE COLLECTION</p>
  
            <h1>
              TIMELESS PIECES.
              <br />
              UNIQUE STORIES.
            </h1>
  
            <p className="hero-description">
              Discover carefully curated vintage and secondhand pieces
              with stories worth wearing.
            </p>
  
            <button className="hero-button">SHOP COLLECTION</button>
          </div>
        </section>
  
        <section className="categories">
          <div className="section-heading">
            <p className="section-label">EXPLORE THE ARCHIVE</p>
            <h2>SHOP BY CATEGORY</h2>
          </div>
  
          <div className="category-grid">
            <div className="category-card">
              <h3>OUTERWEAR</h3>
              <p>Coats, jackets & timeless layers</p>
              <button>EXPLORE</button>
            </div>
  
            <div className="category-card">
              <h3>KNITWEAR</h3>
              <p>Classic knits & cozy textures</p>
              <button>EXPLORE</button>
            </div>
  
            <div className="category-card">
              <h3>SHIRTS</h3>
              <p>Vintage shirts & everyday classics</p>
              <button>EXPLORE</button>
            </div>
  
            <div className="category-card">
              <h3>BOTTOMS</h3>
              <p>Denim, trousers & vintage essentials</p>
              <button>EXPLORE</button>
            </div>
          </div>
        </section>
  
        <section className="featured-items">
          <div className="section-heading">
            <p className="section-label">HANDPICKED FOR YOU</p>
            <h2>FEATURED PIECES</h2>
          </div>
  
          <div className="product-grid">
  <ProductCard
    category="OUTERWEAR"
    name="Vintage Wool Overcoat"
    price="Rp750.000"
  />

  <ProductCard
    category="KNITWEAR"
    name="Classic Aran Knit Sweater"
    price="Rp450.000"
  />

  <ProductCard
    category="JACKET"
    name="Distressed Leather Jacket"
    price="Rp900.000"
  />

  <ProductCard
    category="SHIRT"
    name="Vintage Oxford Shirt"
    price="Rp350.000"
  />
</div>
  
          <div className="featured-action">
            <button>VIEW ALL PIECES</button>
          </div>
        </section>
  
        <section className="archivists-note">
          <div className="archivists-content">
            <p className="section-label">FROM THE ARCHIVE</p>
  
            <h2>
              EVERY PIECE HAS
              <br />
              A STORY TO TELL.
            </h2>
  
            <p className="archivists-description">
              We believe clothing should carry more than a trend.
              Each piece is carefully selected for its character,
              history, and timeless appeal.
            </p>
  
            <button>READ OUR STORY</button>
          </div>
        </section>
  
        <section className="how-it-works">
          <div className="section-heading">
            <p className="section-label">HOW IT WORKS</p>
            <h2>VINTAGE, MADE SIMPLE.</h2>
          </div>
  
          <div className="steps-grid">
            <div className="step-card">
              <span>01</span>
              <h3>DISCOVER</h3>
              <p>
                Explore our curated collection of unique vintage pieces.
              </p>
            </div>
  
            <div className="step-card">
              <span>02</span>
              <h3>CHOOSE</h3>
              <p>
                Find a piece that matches your style and story.
              </p>
            </div>
  
            <div className="step-card">
              <span>03</span>
              <h3>ACQUIRE</h3>
              <p>
                Order your favorite piece and give it a new chapter.
              </p>
            </div>
          </div>
        </section>
  
        <section className="sustainability">
          <div className="sustainability-content">
            <p className="section-label">BETTER FOR THE PLANET</p>
  
            <h2>
              WEAR IT AGAIN.
              <br />
              MAKE IT LAST.
            </h2>
  
            <p>
              Choosing secondhand means giving quality pieces
              another life while reducing unnecessary waste.
            </p>
  
            <button>LEARN MORE</button>
          </div>
        </section>
  
        <section className="testimonials">
          <div className="section-heading">
            <p className="section-label">FROM OUR COMMUNITY</p>
            <h2>LOVED BY VINTAGE COLLECTORS.</h2>
          </div>
  
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                “The quality and attention to detail are incredible.
                Every piece feels genuinely special.”
              </p>
              <p className="testimonial-name">— ALEX, JAKARTA</p>
            </div>
  
            <div className="testimonial-card">
              <p className="testimonial-text">
                “I love that every item has its own character.
                THRIVO makes finding vintage pieces so easy.”
              </p>
              <p className="testimonial-name">— MAYA, BANDUNG</p>
            </div>
  
            <div className="testimonial-card">
              <p className="testimonial-text">
                “Finally found a vintage jacket that actually
                feels like it was made for me.”
              </p>
              <p className="testimonial-name">— RAKA, SURABAYA</p>
            </div>
          </div>
        </section>
  
        <Newsletter />
  
        <Footer />
      </div>
    )
  }
  
  export default Home