// src/components/ProductList.jsx
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { urunleriGetir } from '../api';
import './ProductList.css';

export default function ProductList() {
  const [urunler, setUrunler] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    urunleriGetir()
      .then(setUrunler)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredUrunler = urunler
  .filter(urun => urun.quantity > 0) 
  .filter(urun =>
    urun.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    urun.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="product-list">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Ürün veya marka ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredUrunler.length === 0 ? (
          <div className="empty-state">
            <h3>Ürün bulunamadı</h3>
            <p>
              {searchTerm 
                ? `"${searchTerm}" için sonuç bulunamadı. Farklı bir arama terimi deneyin.`
                : 'Henüz ürün yüklenmedi.'
              }
            </p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredUrunler.map((urun, index) => (
              <div className="product-item" key={urun.id || index}>
                <ProductCard urun={urun} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
