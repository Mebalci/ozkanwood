import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { urunleriGetir } from "../api";
import arka from "../assets/ARKA.png";
import logoBeyaz from "../assets/LOGO_BEYAZ.png";


export default function Home() {
  const [urunler, setUrunler] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    urunleriGetir()
      .then((data) => {
        setUrunler(data.filter(u => u.quantity > 0));
      })
      .finally(() => setLoading(false));
  }, []);

  const featured = urunler.slice(0, 8);

  return (
    <div className="flex flex-col">

      {/* ================= HERO ================= */}
      <section
        className="relative text-white overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${arka})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/20"></div>      

        <div className="relative container mx-auto px-4 py-28 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-block mb-4 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold">
              El Yapımı • Doğal • Zamansız
            </span>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
              Ahşabın <span className="text-accent">Zarafeti</span><br />
              Yaşam Alanınızda
            </h1>

            <p className="text-gray-300 text-lg max-w-xl mb-8 leading-relaxed">
              Özkan Wood, doğal ahşabı modern tasarımla buluşturur.
              El işçiliği kulplar, lazer kesim detaylar ve özgün ahşap saatler.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/urunler" className="btn btn-primary">
                Ürünleri Keşfet
              </Link>
              <a
                href="https://wa.me/905070824608"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline text-white border-white hover:bg-white hover:text-gray-900"
              >
                WhatsApp İletişim
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            {/* Arka plan glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-transparent blur-3xl"></div>

            
              
              {/* Logo */}
              <img
                src={logoBeyaz}
                alt="Özkan Wood Logo"
                className="
                  w-72 md:w-80 lg:w-96     
                  animate-float
                  drop-shadow-[0_25px_55px_rgba(0,0,0,0.65)]
                  relative z-10
                "
              />

              {/* Alt yansıma */}
              <div className="absolute bottom-6 w-40 h-6 bg-black/40 blur-xl rounded-full"></div>
            </div>
          

        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block mb-3 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold">
              Seçkin Koleksiyon
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Öne Çıkan Ürünler
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              En çok tercih edilen ahşap kulplar ve özel tasarım saatler
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin h-12 w-12 border-b-2 border-accent rounded-full"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featured.map((urun, i) => (
                <ProductCard key={urun.id || i} urun={urun} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/urunler" className="btn btn-primary">
              Tüm Ürünleri Gör
            </Link>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "fa-tree", title: "Doğal Ahşap", desc: "Sürdürülebilir ve kaliteli malzeme" },
              { icon: "fa-tools", title: "Usta İşçiliği", desc: "El emeğiyle şekillenen ürünler" },
              { icon: "fa-clock", title: "Zamansız Tasarım", desc: "Her mekâna uyumlu estetik" },
              { icon: "fa-award", title: "Kalite Garantisi", desc: "Uzun ömürlü kullanım" },
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <i className={`fas ${f.icon} text-accent text-2xl`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-accent to-accent-dark text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-extrabold mb-6">
            Özel Ölçü veya Tasarım mı İstiyorsunuz?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Lazer kesim, ahşap saat veya kulp tasarımlarında size özel üretim yapıyoruz.
          </p>
          <Link to="/iletisim" className="btn bg-white text-accent hover:bg-gray-100">
            Bizimle İletişime Geçin
          </Link>
        </div>
      </section>

    </div>
  );
}
