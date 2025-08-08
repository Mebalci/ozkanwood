// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import logo from '../assets/LOGO.png';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { count } = useCart();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const throttledScrollHandler = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.classList.add('menu-open');
    else document.body.classList.remove('menu-open');
    return () => document.body.classList.remove('menu-open');
  }, [isMenuOpen]);

  const throttle = (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments, context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const handleLinkClick = () => setIsMenuOpen(false);
  const handleKeyDown = (e) => e.key === 'Escape' && setIsMenuOpen(false);

  const navLinks = [
    { path: '/', label: 'Anasayfa' },
    { path: '/urunler', label: 'Ürünler' },
    { path: '/hakkimizda', label: 'Hakkımızda' },
    { path: '/iletisim', label: 'İletişim' },
  ];

  return (
    <>
      {isMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setIsMenuOpen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        />
      )}

      <header className={`navbar-premium ${isScrolled ? 'scrolled' : ''}`} role="banner">
        <nav className="navbar navbar-expand-lg" role="navigation" aria-label="Ana navigasyon">
          <div className="container-fluid px-3 px-lg-4">            
            <Link
              to="/"
              className="navbar-brand logo-container"
              onClick={handleLinkClick}
              aria-label="Özkan Wood Ana Sayfa"
            >
              <img
                src={logo}
                alt="Özkan Wood Logo"
                className="logo-img"
                loading="eager"
                width="120"
                height="60"
              />
            </Link>
           
            <div className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
              <ul className="navbar-nav" role="menubar">
                {navLinks.map(({ path, label }) => (
                  <li className="nav-item" key={path} role="none">
                    <Link
                      to={path}
                      className={`nav-link nav-link-premium ${isActive(path) ? 'active' : ''}`}
                      onClick={handleLinkClick}
                      role="menuitem"
                      aria-current={isActive(path) ? 'page' : undefined}
                    >
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="right-rail">
              <button
                className={`navbar-toggler ${isMenuOpen ? 'active' : ''}`}
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                onKeyDown={handleKeyDown}
                aria-controls="navbarNav"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>

              <Link
                to="/sepet"
                className="nav-link cart-link"
                onClick={handleLinkClick}
                role="button"
                aria-label={`Sepet (${count})`}
              >
                <span className="cart-icon" aria-hidden="true">🛒</span>
                <span>Sepet</span>
                <span className="cart-badge" aria-live="polite">{count}</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
