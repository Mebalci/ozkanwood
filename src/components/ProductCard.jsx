import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';
import { useCart } from '../context/CartContext';

export default function ProductCard({ urun }) {
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (urun.quantity === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev === 0 ? urun.images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev === urun.images.length - 1 ? 0 : prev + 1));
  };

  const formatPrice = (price) => new Intl.NumberFormat('tr-TR').format(price);

  const calculateDiscountedPrice = () => {
    const originalPrice = urun.salePrice || urun.price;
    return Math.round(originalPrice * 0.95);
  };

  const getDiscountPercentage = () => 5;

  const getStockStatus = () => {
    if (urun.quantity <= 10) return 'low';
    if (urun.quantity <= 50) return 'medium';
    return 'high';
  };

  const getStockText = () => {
    if (urun.quantity <= 10) return 'Son ' + urun.quantity + ' adet';
    if (urun.quantity <= 50) return 'Sınırlı stok';
    return 'Stokta var';
  };

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    const message = `Merhaba! ${urun.brand || ''} ${urun.title} ürünü hakkında bilgi almak istiyorum. Fiyat: ${formatPrice(calculateDiscountedPrice())} TL`;
    const whatsappUrl = `https://wa.me/905070824608?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCardClick = () => {
    navigate(`/urun/${urun.id || encodeURIComponent(urun.title)}`, { state: { urun } });
  };

  const discountedPrice = calculateDiscountedPrice();
  const originalPrice = urun.salePrice || urun.price;
  const stockStatus = getStockStatus();
  const stockText = getStockText();

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="discount-badge">%{getDiscountPercentage()} İndirim</div>

      <div className={`stock-badge ${stockStatus}`}>
        {stockText}
      </div>

      <div className="image-container">
        {urun.images?.length > 0 && (
          <img src={urun.images[imageIndex]} alt={urun.title} className="product-image" />
        )}

        {urun.images?.length > 1 && (
          <>
            <button className="nav-btn prev-btn" onClick={handlePrev}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button className="nav-btn next-btn" onClick={handleNext}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>

            <div className="image-indicators" onClick={(e)=>e.stopPropagation()}>
              {urun.images.map((_, index) => (
                <span
                  key={index}
                  className={`indicator ${index === imageIndex ? 'active' : ''}`}
                  onClick={() => setImageIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="product-info">
        <div className="brand">{urun.brand}</div>
        <h3 className="title">{urun.title}</h3>

        {urun.category && (
          <div className="category">
            <span className="category-tag">
              {urun.category.length > 13 ? `${urun.category.slice(0, 12)}...` : urun.category}
            </span>
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

        <div className="card-actions" onClick={(e)=>e.stopPropagation()}>
          <button className="whatsapp-btn" onClick={() => addToCart(urun, 1)}>
            Sepete Ekle
          </button>          
        </div>
      </div>
    </div>
  );
}
