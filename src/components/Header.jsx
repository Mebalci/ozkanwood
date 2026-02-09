import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import logo from "../assets/LOGO_BEYAZ.png";

function CartIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={props.className}
    >
      <path
        d="M6.5 6.5h14l-1.6 8.2a2 2 0 0 1-2 1.6H9.1a2 2 0 0 1-2-1.6L5.4 3.8A1 1 0 0 0 4.4 3H2.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM17.5 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={props.className}>
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={props.className}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={props.className}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { count } = useCart();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  const navLinks = [
    { path: "/", label: "Anasayfa" },
    { path: "/urunler", label: "Ürünler" },
    { path: "/hakkimizda", label: "Hakkımızda" },
    { path: "/iletisim", label: "İletişim" },
  ];

  return (
    <>
      {/* Overlay */}
      {isMenuOpen && (
        <button
          aria-label="Menüyü kapat"
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "border-b border-white/10",
          isScrolled
            ? "bg-neutral-950/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            : "bg-neutral-950/55 backdrop-blur-md",
        ].join(" ")}
      >
        <nav className="container mx-auto px-4">
          <div className="h-20 flex items-center justify-between gap-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img src={logo} alt="Özkan Wood Logo" className="h-10 w-auto" />
              <span className="hidden sm:block text-white font-semibold tracking-wide">
                Özkan Wood
              </span>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-2">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className={[
                      "px-4 py-2 rounded-full text-sm font-semibold transition",
                      isActive(path)
                        ? "text-white bg-white/10 ring-1 ring-white/15"
                        : "text-white/80 hover:text-white hover:bg-white/5",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Quick search button (opsiyonel) */}
              <Link
                to="/urunler"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/5 transition"
                aria-label="Ürünlerde ara"
              >
                <SearchIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">Ara</span>
              </Link>

              {/* Cart */}
              <Link
                to="/sepet"
                className="relative inline-flex items-center justify-center w-11 h-11 rounded-full text-white hover:bg-white/5 transition"
                aria-label={`Sepet (${count})`}
              >
                <CartIcon className="w-6 h-6" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-white hover:bg-white/5 transition"
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
              >
                {isMenuOpen ? (
                  <CloseIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <div
          className={[
            "lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm z-50",
            "bg-neutral-950 border-l border-white/10", 
            "shadow-[0_0_40px_rgba(0,0,0,0.6)]",      
            "transition-transform duration-300",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >

          <div className="p-6 pt-7">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Özkan Wood Logo" className="h-10 w-auto" />
                <div className="text-white font-semibold">Özkan Wood</div>
              </div>
              <button
                className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-white/5 transition"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Menüyü kapat"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={[
                    "block px-4 py-3 rounded-2xl font-semibold transition",
                    isActive(path)
                      ? "bg-white/10 text-white ring-1 ring-white/10"
                      : "text-white/85 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                to="/urunler"
                onClick={() => setIsMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold py-3 rounded-2xl transition"
              >
                <SearchIcon className="w-5 h-5" />
                Ürünleri Keşfet
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}
