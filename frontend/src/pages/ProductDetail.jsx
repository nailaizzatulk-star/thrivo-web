import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Ekstrak data jika terbungkus dalam { data: ... } atau { item: ... }
        const itemData = data.data || data.item || data;
        setProduct(itemData);
      })
      .catch((err) => console.error("Failed to fetch product detail:", err));
  }, [id]);

  if (!product) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

  const title = product.title || product.name || "Item";
  const price = product.sellingPrice || product.price || 0;

  return (
    <>
      <Header />
      <main className="product-detail-page">
        <section className="product-detail">
          
          <div className="product-detail-image">
            <img 
              src={product.imageUrl || product.image || 'https://via.placeholder.com/400'} 
              alt={title} 
              style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
            />
          </div>

          <div className="product-detail-info">
            <p className="product-category">{product.category || 'CATEGORY'}</p>
            
            {/* Judul Barang */}
            <h1>{title}</h1>

            {/* Harga */}
            <div className="product-price-container" style={{ margin: '15px 0' }}>
              <p className="product-detail-price" style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>
                Rp{price ? price.toLocaleString('id-ID') : '0'}
              </p>
              {product.originalPrice && (
                <p style={{ color: '#888', margin: '5px 0 0 0', fontSize: '0.95rem' }}>
                  Original Retail: Rp{product.originalPrice.toLocaleString('id-ID')}
                </p>
              )}
            </div>

            {/* Deskripsi */}
            <div className="product-detail-description">
              <p>{product.description || 'No description available.'}</p>
            </div>

            {/* Meta Info */}
            <div className="product-detail-meta" style={{ display: 'flex', gap: '40px', margin: '20px 0' }}>
              <div>
                <span>CONDITION</span>
                <strong>{product.condition || 'N/A'}</strong>
              </div>
              <div>
                <span>STATUS</span>
                <strong>{product.status || 'AVAILABLE'}</strong>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ProductDetail;