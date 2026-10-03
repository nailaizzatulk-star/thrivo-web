import { Link } from 'react-router-dom';

function ProductCard({ id, name, price, category, imageUrl }) {
  return (
    <div className="product-card">
      <Link
        to={`/product/${id}`}
        className="product-card-link"
      >
        <div className="product-image-container">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="product-image"
            />
          ) : (
            <div className="product-image-placeholder">
              NO IMAGE
            </div>
          )}
        </div>

        <div className="product-info">
          <p className="product-category">
            {category || 'ITEM'}
          </p>

          <h3 className="product-name">
            {name}
          </h3>

          <p className="product-price">
            {price}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;