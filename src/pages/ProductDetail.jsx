import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [urun, setUrun] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
  if (location.state?.urun) {
    setUrun(location.state.urun);
  } else {
    fetch("/urunler.json")
      .then(res => res.json())
      .then(data => {
        const matching = data.products.find(p => p.id === id);
        setUrun(matching || null);
      });
  }
}, [location.state, id]);


  const handlePrev = () => {
    setImageIndex((prev) => (prev === 0 ? urun.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setImageIndex((prev) => (prev === urun.images.length - 1 ? 0 : prev + 1));
  };

  const handleWhatsAppClick = () => {
    const message = `Merhaba! ${urun.brand || ''} ${urun.title} ürünü hakkında bilgi almak istiyorum. Fiyat: ${formatPrice(calculateDiscountedPrice())} TL`;
    const whatsappUrl = `https://wa.me/905070824608?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR').format(price);
  };

  // %5 indirim hesaplama
  const calculateDiscountedPrice = () => {
    const originalPrice = urun.salePrice || urun.price;
    return Math.round(originalPrice * 0.95); // %5 indirim
  };

  const getDiscountPercentage = () => {
    return 5; // Sabit %5 indirim
  };

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

  if (!urun) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
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
            {/* İndirim Badge */}
            <div className="discount-badge">
              %{getDiscountPercentage()} İndirim
            </div>

            {/* Stok Durumu Badge */}
            <div className={`stock-badge ${stockStatus}`}>
              {stockText}
            </div>

            {urun.images && urun.images.length > 0 && (
              <div className="main-image-container">
                <img
                  src={urun.images[imageIndex]}
                  alt={urun.title}
                  className="main-image"
                />
                
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

            {urun.images && urun.images.length > 1 && (
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
            {/* Marka */}
            <div className="brand">{urun.brand}</div>
            
            {/* Başlık */}
            <h1 className="title">{urun.title}</h1>

            {/* Kategori */}
            {urun.category && (
              <div className="category">
                <span className="category-tag">{urun.category}</span>
              </div>
            )}

            {/* Fiyat Bölümü */}
            <div className="price-section">
              <div className="price-info">
                <span className="current-price">{formatPrice(discountedPrice)} ₺</span>
                <span className="original-price">{formatPrice(originalPrice)} ₺</span>
              </div>
              <div className="discount-info">
                <span className="discount-amount">{formatPrice(originalPrice - discountedPrice)} ₺ tasarruf</span>
              </div>
            </div>

            {/* Stok Bilgisi */}
            <div className="stock-info">
              <div className={`stock-indicator ${stockStatus}`}></div>
              <span className="stock-text">{stockText}</span>
            </div>
           
            
            {/* Açıklama */}
            {urun.description && (
              <div className="description">
                <h3>Ürün Açıklaması</h3>
                <p>{urun.description}</p>
              </div>
            )}

            {/* Tüm Özellikler */}
            {urun.attributes && urun.attributes.length > 0 && (
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

            

            <button className="whatsapp-btn" onClick={handleWhatsAppClick}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp ile Sipariş Ver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 