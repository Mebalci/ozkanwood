import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [urun, setUrun] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    if (location.state?.urun) {
      setUrun(location.state.urun);
    } else {
      fetch("/urunler.json")
        .then(res => res.json())
        .then(data => {
          const matching = data.products.find(p => String(p.id) === String(id));
          setUrun(matching || null);
        });
    }
  }, [location.state, id]);

  const handlePrev = () => setImageIndex((prev) => (prev === 0 ? urun.images.length - 1 : prev - 1));
  const handleNext = () => setImageIndex((prev) => (prev === urun.images.length - 1 ? 0 : prev + 1));
  const handleBackClick = () => navigate(-1);

  const formatPrice = (price) => new Intl.NumberFormat('tr-TR').format(price);
  const calculateDiscountedPrice = () => Math.round((urun.salePrice || urun.price) * 0.95);
  const getDiscountPercentage = () => 5;
  const getStockStatus = () => (urun.quantity <= 10 ? 'low' : urun.quantity <= 50 ? 'medium' : 'high');
  const getStockText = () => (urun.quantity <= 10 ? `Son ${urun.quantity} adet` : urun.quantity <= 50 ? 'Sınırlı stok' : 'Stokta var');

  const handleWhatsAppClick = () => {
    const message = `Merhaba! ${urun.brand || ''} ${urun.title} ürünü hakkında bilgi almak istiyorum. Fiyat: ${formatPrice(calculateDiscountedPrice())} TL`;
    const whatsappUrl = `https://wa.me/905070824608?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!urun) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="loading-container"><div className="loading-spinner"></div></div>
        </div>
      </div>
    );
  }

  const discountedPrice = calculateDiscountedPrice();
  const originalPrice = urun.salePrice || urun.price;
  const stockStatus = getStockStatus();
  const stockText = getStockText();

  return (
    <div className="product-detail">
      <div className="container">
        <button className="back-btn" onClick={handleBackClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Geri Dön
        </button>

        <div className="product-detail-content">
          <div className="product-images">
            <div className="discount-badge">%{getDiscountPercentage()} İndirim</div>
            <div className={`stock-badge ${stockStatus}`}>{stockText}</div>

            {urun.images?.length > 0 && (
              <div className="main-image-container">
                <img src={urun.images[imageIndex]} alt={urun.title} className="main-image" />
                {urun.images.length > 1 && (
                  <>
                    <button className="nav-btn prev" onClick={handlePrev}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </button>
                    <button className="nav-btn next" onClick={handleNext}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </button>
                  </>
                )}
              </div>
            )}

            {urun.images?.length > 1 && (
              <div className="thumbnails">
                {urun.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${urun.title} ${index + 1}`}
                    className={`thumbnail ${index === imageIndex ? 'active' : ''}`}
                    onClick={() => setImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <div className="brand">{urun.brand}</div>
            <h1 className="title">{urun.title}</h1>
            {urun.category && (
              <div className="category">
                <span className="category-tag">{urun.category}</span>
              </div>
            )}

            <div className="price-section">
              <div className="price-info">
                <span className="current-price">{formatPrice(discountedPrice)} ₺</span>
                <span className="original-price">{formatPrice(originalPrice)} ₺</span>
              </div>
              <div className="discount-info">
                <span className="discount-amount">{formatPrice(originalPrice - discountedPrice)} ₺ tasarruf</span>
              </div>
            </div>

            <div className="stock-info">
              <div className={`stock-indicator ${stockStatus}`}></div>
              <span className="stock-text">{stockText}</span>
            </div>

            {urun.description && (
              <div className="description">
                <h3>Ürün Açıklaması</h3>
                <p>{urun.description}</p>
              </div>
            )}

            {urun.attributes?.length > 0 && (
              <div className="attributes">
                <h3>Ürün Özellikleri</h3>
                <div className="attributes-list">
                  {urun.attributes.map((attr, index) => (
                    <div key={index} className="attribute">
                      <span className="attr-name">{attr.name}:</span>
                      <span className="attr-value">{attr.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="detail-actions">
              <button className="whatsapp-btn" onClick={() => addToCart(urun, 1)}>
                Sepete Ekle
              </button>              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
