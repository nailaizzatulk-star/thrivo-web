import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

function Catalog() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('DEFAULT');

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then((res) => res.json())
      .then((data) => {
        // Memastikan data yang diterima berbentuk array
        const resultItems = Array.isArray(data) ? data : data.data || [];
        setItems(resultItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data katalog:", err);
        setLoading(false);
      });
  }, []);

  // Filter Kategori
  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    return item.category?.toUpperCase() === selectedCategory;
  });

  // Sorting Harga
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'LOW_TO_HIGH') return (a.sellingPrice || 0) - (b.sellingPrice || 0);
    if (sortBy === 'HIGH_TO_LOW') return (b.sellingPrice || 0) - (a.sellingPrice || 0);
    return 0;
  });

  return (
    <>
      <Header />
      <main className="catalog-page" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="catalog-header" style={{ marginBottom: '30px', textAlign: 'center' }}>
          <p style={{ letterSpacing: '2px', color: '#666', fontSize: '0.85rem' }}>ARCHIVE COLLECTION</p>
          <h2>ALL PIECES</h2>
        </div>

        <div className="catalog-controls" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <div className="category-filters" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['ALL', 'OUTERWEAR', 'KNITWEAR', 'SHIRTS', 'BOTTOMS', 'JACKET'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #000',
                  backgroundColor: selectedCategory === cat ? '#000' : '#fff',
                  color: selectedCategory === cat ? '#fff' : '#000',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="sort-filter">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #000', cursor: 'pointer' }}
            >
              <option value="DEFAULT">Sort by: Default</option>
              <option value="LOW_TO_HIGH">Price: Low to High</option>
              <option value="HIGH_TO_LOW">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading archive items...</div>
        ) : sortedItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
            No items found in this category.
          </div>
        ) : (
 
          <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '25px' }}>
            {sortedItems.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                category={item.category}
                name={item.title}
                price={`Rp${item.sellingPrice ? item.sellingPrice.toLocaleString('id-ID') : '0'}`}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Catalog;