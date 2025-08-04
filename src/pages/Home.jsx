// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { urunleriGetir } from '../api';
import './Home.css';
import logo from '../assets/LOGO.png';
import video from '../assets/video.mp4';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const products = await urunleriGetir();
      // Sadece stokta olanları al
      const stoktaOlanlar = products.filter(p => p.quantity > 0);
      setFeaturedProducts(stoktaOlanlar.slice(0, 8));
    } catch (err) {
      console.error("Ürün çekme hatası:", err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchProducts();
}, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video otomatik oynatma engellendi:', error);
      });
    }
  }, []);

  const features = [
    {
      icon: 'fa-seedling',
      title: 'Doğal Malzeme',
      desc: 'Sürdürülebilir kaynaklı premium ahşap kullanımı',
    },
    {
      icon: 'fa-tools',
      title: 'Usta İşçiliği',
      desc: 'Geleneksel sanat ve modern teknolojinin mükemmel birleşimi',
    },
    {
      icon: 'fa-gem',
      title: 'Lüks Kalite',
      desc: 'Her ürün titizlikle kontrol edilir ve test edilir',
    },
    {
      icon: 'fa-recycle',
      title: 'Çevre Dostu',
      desc: 'Sürdürülebilir ve ekolojik üretim süreci',
    },
    {
      icon: 'fa-award',
      title: 'Garanti',
      desc: 'Uzun süreli dayanıklılık ve memnuniyet garantisi',
    },
    {
      icon: 'fa-shipping-fast',
      title: 'Hızlı Teslimat',
      desc: 'Türkiye geneli güvenli ve hızlı kargo hizmeti',
    },
    {
      icon: 'fa-handshake',
      title: 'Güvenilir',
      desc: 'Binlerce mutlu müşterinin tercihi ve güveni',
    },
    {
      icon: 'fa-paint-brush',
      title: 'Özel Tasarım',
      desc: 'Size özel tasarım ve kişiselleştirme seçenekleri',
    }
  ];

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="premium-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="premium-badge">
                <i className="fas fa-star"></i>
                EL YAPIMI MÜKEMMELLİK
              </div>
              <h1 className="hero-title">
                <span className="gradient-text">Özkan Wood</span>
                <span className="subtitle">Birbirinden Özel Tasarımlar</span>
              </h1>
              <p className="hero-description">
                Doğanın zarafetini ustaca işlenmiş ahşap kulplarla mutfağınıza taşıyoruz. 
                Her ürün özenle seçilmiş malzemeler ve usta ellerde şekillenmektedir.
              </p>
              <div className="hero-buttons">
                <Link to="/urunler" className="btn-premium primary">
                  <i className="fas fa-search"></i>
                  Koleksiyonu Keşfet
                </Link>
                <Link to="/hakkimizda" className="btn-premium secondary">
                  <i className="fas fa-info-circle"></i>
                  Hikayemiz
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Mutlu Müşteri</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Doğal Malzeme</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Yıl Tecrübe</span>
                </div>
              </div>
            </div>
            <div className="hero-image-container">
              <div className="hero-image-wrapper">
                <img src={logo} alt="Özkan Wood Logo" className="hero-image" />
                <div className="image-glow"></div>
                <div className="floating-elements">
                  <div className="floating-element element-1"></div>
                  <div className="floating-element element-2"></div>
                  <div className="floating-element element-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-arrow">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </section>      

      {/* FEATURED PRODUCTS */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <i className="fas fa-heart"></i>
              KOLEKSİYON
            </span>
            <h2 className="section-title">Seçkin Ürünler</h2>
            <p className="section-subtitle">
              Özenle seçilmiş ve el emeği ile üretilmiş özel tasarımlarımız
            </p>
          </div>
          
          {isLoading ? (
            <div className="products-loading">
              <div className="loading-grid">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="product-skeleton">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                      <div className="skeleton-title"></div>
                      <div className="skeleton-price"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((urun, index) => (
                <div key={index} className="product-wrapper">
                  <ProductCard urun={urun} />
                </div>
              ))}
            </div>
          )}
          
          <div className="section-footer">
            <Link to="/urunler" className="btn-premium primary large">
              <i className="fas fa-th-large"></i>
              Tüm Ürünleri Gör
            </Link>
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="craftsmanship-story">
        <div className="container">
          <div className="story-container">
            <div className="story-text">
              <span className="section-badge">
                <i className="fas fa-palette"></i>
                SANAT
              </span>
              <h2 className="section-title">El Sanatının Büyüsü</h2>
              <p className="story-description">
                Özkan Wood, geleneksel ahşap işçiliğini modern tasarımla harmanlayan bir markadır. 
                Her ürün, ustalarımızın deneyimi ve sanatsal yaklaşımıyla özenle üretilmektedir.
              </p>
              <div className="story-features">
                <div className="story-feature">
                  <div className="feature-icon-small">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="feature-content">
                    <h4>Aynı Gün Kargo</h4>
                    <p>Siparişleriniz aynı gün kargoya teslim edilir</p>
                  </div>
                </div>
                <div className="story-feature">
                  <div className="feature-icon-small">
                    <i className="fas fa-hand-holding-heart"></i>
                  </div>
                  <div className="feature-content">
                    <h4>Değişim Garantisi</h4>
                    <p>30 gün içinde koşulsuz değişim hakkı</p>
                  </div>
                </div>
                <div className="story-feature">
                  <div className="feature-icon-small">
                    <i className="fas fa-certificate"></i>
                  </div>
                  <div className="feature-content">
                    <h4>Güvenli Teslimat</h4>
                    <p>Hasarsız teslimat garantisi ile kapınıza</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="story-media">
              <div className="video-container">
                <video 
                  ref={videoRef} 
                  src={video} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="story-video"
                />
                <div className="video-overlay">
                  <div className="play-button">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="premium-cta">
        <div className="container">
          <div className="cta-content">
            <span className="cta-badge">
              <i className="fas fa-magic"></i>
              ÖZEL TASARIM
            </span>
            <h2 className="cta-title">Hayalinizdeki Kulp</h2>
            <p className="cta-description">
              Kişisel ölçüler, desenler ve renklerle size özel üretim yapıyoruz. 
              Mutfağınızın tarzına uygun benzersiz tasarımlar için bizimle iletişime geçin.
            </p>
            <div className="cta-features">
              <div className="cta-feature">
                <i className="fas fa-palette"></i>
                <span>Sınırsız Seçenekler</span>
              </div>
              <div className="cta-feature">
                <i className="fas fa-ruler"></i>
                <span>Özel Ölçü Üretimi</span>
              </div>
              <div className="cta-feature">
                <i className="fas fa-shipping-fast"></i>
                <span>Hızlı Teslimat</span>
              </div>
            </div>
            <div className="cta-buttons">
              <Link to="/iletisim" className="btn-premium primary large">
                <i className="fas fa-pencil-ruler"></i>
                Özel Tasarım Talebi
              </Link>              
            </div>
          </div>
        </div>
        <div className="cta-background-elements">
          <div className="bg-element bg-element-1"></div>
          <div className="bg-element bg-element-2"></div>
          <div className="bg-element bg-element-3"></div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <i className="fas fa-quote-left"></i>
              YORUMLAR
            </span>
            <h2 className="section-title">Müşterilerimiz Ne Diyor?</h2>
            <p className="section-subtitle">
              Binlerce mutlu müşterimizden gelen gerçek yorumlar
            </p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <p className="testimonial-text">
                "Özkan Wood'un ürünleri gerçekten kaliteli. Mutfağımın görünümü 
                tamamen değişti. Herkese tavsiye ederim!"
              </p>
              <div className="testimonial-author">
                <strong>Ayşe K.</strong>
                <span>İstanbul</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <p className="testimonial-text">
                "El işçiliği harika, tasarım çok şık. Aldığım kulplar tam istediğim gibiydi. 
                Kesinlikle tekrar alışveriş yapacağım."
              </p>
              <div className="testimonial-author">
                <strong>Mehmet S.</strong>
                <span>Ankara</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <p className="testimonial-text">
                "Kargo çok hızlıydı, paketleme mükemmeldi. Ürünler fotoğraftakinden 
                bile daha güzel çıktı. Teşekkürler Özkan Wood!"
              </p>
              <div className="testimonial-author">
                <strong>Fatma T.</strong>
                <span>İzmir</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="premium-features">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <i className="fas fa-crown"></i>
              ÜSTÜNLÜK
            </span>
            <h2 className="section-title">Neden Özkan Wood?</h2>
            <p className="section-subtitle">
              Her detayında mükemmellik arayanlar için özel olarak tasarlanmış ürünler
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
                <div className="feature-number">{String(index + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}