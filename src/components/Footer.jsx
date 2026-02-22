import { Link } from "react-router-dom";
import logo from "../assets/LOGO.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-100 border-t border-neutral-200 mt-auto">
      <div className="mx-auto w-full max-w-screen-xl p-6 lg:py-10">
        {/* Top */}
        <div className="md:flex md:justify-between">
          {/* Logo */}
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Özkan Wood Logo" className="h-10 w-auto" />
              <span className="text-2xl font-semibold text-gray-900 whitespace-nowrap">
                Özkan Wood
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-gray-600 text-sm leading-relaxed">
              Doğal ahşap ürünleri ustalıkla işleyerek yaşam alanlarınıza estetik
              ve kalite katıyoruz.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-10 sm:grid-cols-3">
            {/* Quick Links */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Hızlı Linkler
              </h2>
              <ul className="text-gray-600 font-medium space-y-3">
                <li>
                  <Link to="/" className="hover:underline">
                    Anasayfa
                  </Link>
                </li>
                <li>
                  <Link to="/urunler" className="hover:underline">
                    Ürünler
                  </Link>
                </li>
                <li>
                  <Link to="/hakkimizda" className="hover:underline">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link to="/iletisim" className="hover:underline">
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                İletişim
              </h2>
              <ul className="text-gray-600 font-medium space-y-3">
                <li>
                  <a href="tel:+905070824608" className="hover:underline">
                    +90 507 082 46 08
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/905070824608"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    WhatsApp
                  </a>
                </li>
                <li className="text-sm">
                  Önder, Taştop Sk. No:16
                  <br />
                  Altındağ / Ankara
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Yasal
              </h2>
              <ul className="text-gray-600 font-medium space-y-3">
                <li>
                  <Link to="/gizlilik" className="hover:underline">
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link to="/kullanim-sartlari" className="hover:underline">
                    Kullanım Şartları
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-neutral-300" />

        {/* PREMIUM - TASARIM & YAZILIM (ORTALI) */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl rounded-2xl bg-white/70 backdrop-blur border border-neutral-200 shadow-[0_18px_60px_-35px_rgba(0,0,0,0.35)] px-5 py-5 sm:px-7 sm:py-6 text-center">
            {/* üst ince vurgu çizgisi */}
            <div className="mx-auto mb-3 h-[3px] w-20 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />

            <div className="text-[11px] sm:text-xs font-extrabold tracking-[0.35em] text-neutral-500 uppercase">
              TASARIM & YAZILIM
            </div>

            <a
              href="https://mebalci.github.io/Kisisel-Profil/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 text-lg sm:text-xl font-black text-neutral-900 hover:underline"
              title="Yazılımcı profiline git"
            >
              Muhammed Emin Balcı              
            </a>

            <div className="mt-1 text-sm text-neutral-600 font-medium">
              Full Stack Yazılım Geliştirici
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © {currentYear}{" "}
            <span className="font-medium text-gray-700">Özkan Wood</span>. Tüm
            hakları saklıdır.
          </span>

          {/* Social icons */}
          <div className="flex mt-4 sm:mt-0 space-x-5">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/ozkanwood/"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5ZM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7Zm5.25-.88a1.13 1.13 0 1 1 0 2.26a1.13 1.13 0 0 1 0-2.26Z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/905070824608"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 0 0-8.66 15l-1.34 5l5.13-1.34A10 10 0 1 0 12 2Zm0 1.5a8.5 8.5 0 0 1 0 17a8.4 8.4 0 0 1-4.27-1.16l-.3-.18l-3.04.8l.8-2.97l-.2-.31A8.5 8.5 0 0 1 12 3.5Zm4.2 10.62c-.23-.11-1.36-.67-1.57-.75c-.21-.08-.37-.11-.52.11c-.15.23-.6.75-.73.9c-.13.15-.27.17-.5.06a6.8 6.8 0 0 1-2-1.24a7.6 7.6 0 0 1-1.4-1.75c-.15-.23-.02-.35.1-.46c.11-.11.23-.27.35-.4c.11-.13.15-.23.23-.38c.08-.15.04-.29-.02-.4c-.06-.11-.52-1.25-.71-1.72c-.19-.45-.38-.39-.52-.39l-.44-.01c-.15 0-.4.06-.61.29c-.21.23-.8.78-.8 1.9c0 1.11.82 2.19.93 2.34c.11.15 1.62 2.47 3.93 3.46c.55.24.98.38 1.32.49c.55.17 1.05.15 1.45.09c.44-.06 1.36-.56 1.55-1.1c.19-.54.19-1 .13-1.1c-.06-.1-.21-.16-.44-.27Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
