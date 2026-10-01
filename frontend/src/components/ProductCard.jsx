import { Link } from 'react-router-dom';

function ProductCard({ id, name, price, category, imageUrl }) {
  return (
    <div className="product-card">
      <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        
        {/* Container Gambar */}
        <div className="product-image-container" style={{ width: '100%', height: '320px', overflow: 'hidden', backgroundColor: '#e5e3dc', borderRadius: '4px' }}>
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888', fontSize: '0.85rem' }}>
              NO IMAGE
            </div>
          )}
        </div>

        {/* Info Produk */}
        <div className="product-info" style={{ padding: '12px 0' }}>
          <p className="product-category" style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '1px' }}>
            {category || 'ITEM'}
          </p>
          <h3 className="product-name" style={{ fontSize: '0.95rem', fontWeight: '600', margin: '0 0 6px 0', lineHeight: '1.3' }}>
            {name}
          </h3>
          <p className="product-price" style={{ fontSize: '0.9rem', fontWeight: 'bold', margin: 0 }}>
            {price}
          </p>
        </div>

      </Link>
    </div>
  );
}

export default ProductCard;