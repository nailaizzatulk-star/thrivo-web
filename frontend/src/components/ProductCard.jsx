import { Link } from 'react-router-dom'

function ProductCard({ id, category, name, price }) {
  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="product-image">
        IMAGE
      </div>

      <div className="product-info">
        <p className="product-category">{category}</p>
        <h3>{name}</h3>
        <p className="product-price">{price}</p>
      </div>
    </Link>
  )
}

export default ProductCard