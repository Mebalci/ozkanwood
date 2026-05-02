import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

/* ---------- SVG ICONS ---------- */
const IconArrowLeft = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M15 18l-6-6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconChevronLeft = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M15 18l-6-6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconChevronRight = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCart = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M5 4h1.5L9 16h8l2-9H7.3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

/* ---------- COMPONENT ---------- */
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
          const matching = data.products.find(
            p => String(p.id) === String(id),
          );
          setUrun(matching || null);
        });
    }
  }, [location.state, id]);

  const formatPrice = n => new Intl.NumberFormat("tr-TR").format(n);
  // %40 indirim ile indirimli fiyat hesapla
  const discountedPrice = Math.round(
    (urun?.salePrice || urun?.price) * 0.6,
  );
  const originalPrice = urun?.salePrice || urun?.price;

  const stockStatus =
    urun?.quantity <= 10
      ? "low"
      : urun?.quantity <= 50
      ? "medium"
      : "high";

  const stockText =
    urun?.quantity <= 10
      ? `Son ${urun.quantity} adet`
      : urun?.quantity <= 50
      ? "Sınırlı stok"
      : "Stokta var";

  const stockColors = {
    high: "bg-green-500",
    medium: "bg-yellow-500",
    low: "bg-red-500",
  };

  if (!urun) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-accent transition"
        >
          <IconArrowLeft className="w-5 h-5" />
          Geri Dön
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* IMAGES */}
          <div className="relative">
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <span className="bg-accent text-white px-4 py-2 rounded-full text-sm font-bold">
                %40 İndirim
              </span>
              <span
                className={`${stockColors[stockStatus]} text-white px-4 py-2 rounded-full text-sm font-bold`}
              >
                {stockText}
              </span>
            </div>

            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg mb-4">
              <img
                src={urun.images[imageIndex]}
                alt={urun.title}
                className="w-full h-[500px] object-contain"
              />

              {urun.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setImageIndex(i =>
                        i === 0 ? urun.images.length - 1 : i - 1,
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                               bg-white/90 hover:bg-white shadow-lg flex items-center justify-center"
                  >
                    <IconChevronLeft className="w-5 h-5 text-gray-800" />
                  </button>

                  <button
                    onClick={() =>
                      setImageIndex(i =>
                        i === urun.images.length - 1 ? 0 : i + 1,
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                               bg-white/90 hover:bg-white shadow-lg flex items-center justify-center"
                  >
                    <IconChevronRight className="w-5 h-5 text-gray-800" />
                  </button>
                </>
              )}
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-2">
              {urun.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setImageIndex(i)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition
                    ${
                      i === imageIndex
                        ? "border-accent"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* INFO */}
          <div>
            {urun.brand && (
              <div className="text-accent font-semibold mb-2">
                {urun.brand}
              </div>
            )}

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {urun.title}
            </h1>

            <div className="mb-6">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-extrabold text-gray-900">
                  {formatPrice(discountedPrice)} ₺
                </span>
                <span className="text-xl text-red-500 line-through">
                  {formatPrice(originalPrice)} ₺
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Fiyata ek olarak 100 TL kargo ve %20 KDV eklenecektir.
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {urun.description ||
                `${urun.title} doğal ahşap malzemeden, el işçiliği ile üretilmiştir.`}
            </p>

            <button
              onClick={() => addToCart(urun, 1)}
              className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-4 px-6
                          rounded-xl text-lg shadow-lg transition hover:scale-[1.02]
                          inline-flex items-center justify-center gap-3"
            >
              <IconCart className="w-6 h-6" />
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
