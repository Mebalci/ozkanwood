import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ urun }) {
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!urun || urun.quantity === 0) return null;

  const handlePrev = e => {
    e.stopPropagation();
    if (!urun.images?.length) return;
    setImageIndex(prev => (prev === 0 ? urun.images.length - 1 : prev - 1));
  };

  const handleNext = e => {
    e.stopPropagation();
    if (!urun.images?.length) return;
    setImageIndex(prev => (prev === urun.images.length - 1 ? 0 : prev + 1));
  };

  const formatPrice = price => new Intl.NumberFormat("tr-TR").format(price);

  const calculateDiscountedPrice = () => {
    const originalPrice = urun.salePrice || urun.price;
    // %40 indirim uygulanır
    return Math.round(originalPrice * 0.6);
  };

  const getDiscountPercentage = () => 40;

  const getStockStatus = () => {
    if (urun.quantity <= 10) return "low";
    if (urun.quantity <= 50) return "medium";
    return "high";
  };

  const getStockText = () => {
    if (urun.quantity <= 10) return `Son ${urun.quantity} adet`;
    if (urun.quantity <= 50) return "Sınırlı stok";
    return "Stokta var";
  };

  const handleCardClick = () => {
    navigate(`/urun/${urun.id || encodeURIComponent(urun.title)}`, {
      state: { urun },
    });
  };

  const discountedPrice = calculateDiscountedPrice();
  const originalPrice = urun.salePrice || urun.price;
  const stockStatus = getStockStatus();
  const stockText = getStockText();

  const stockColors = {
    high: "bg-green-500",
    medium: "bg-yellow-500",
    low: "bg-red-500",
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full max-w-sm bg-white p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col group"
    >
      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100">
        {urun.images?.length > 0 ? (
          <>
            <img
              className="rounded-2xl w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              src={urun.images[imageIndex]}
              alt={urun.title}
            />

            {/* Badges (same alignment) */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10 pointer-events-none">
              <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
                %{getDiscountPercentage()} İndirim
              </span>
            </div>

            {/* Prev/Next (never cropped) */}
            {urun.images?.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  aria-label="Previous image"
                >
                  <i className="fas fa-chevron-left text-sm"></i>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  aria-label="Next image"
                >
                  <i className="fas fa-chevron-right text-sm"></i>
                </button>

                {/* Indicators */}
                <div
                  onClick={e => e.stopPropagation()}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10"
                >
                  {urun.images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageIndex(idx)}
                      className={`h-2 transition-all duration-200 rounded-full ${
                        idx === imageIndex ? "w-6 bg-white" : "w-2 bg-white/60"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="aspect-square w-full rounded-2xl bg-gray-100" />
        )}
      </div>

      {/* Body (Flowbite style) */}
      <div className="flex flex-col pt-6 flex-1">
        {/* Title */}
        <h5 className="text-xl text-gray-900 font-semibold tracking-tight line-clamp-2">
          {urun.title}
        </h5>

        {/* Price + button row (Flowbite layout) */}
        <div className="flex items-center justify-between mt-6 gap-4">
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-gray-900 leading-tight">
              {formatPrice(discountedPrice)} ₺
            </span>
            <span className="text-sm text-red-500 line-through">
              {formatPrice(originalPrice)} ₺
            </span>
          </div>

          {/* CTA: accent ONLY here */}
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              addToCart(urun, 1);
            }}
            className="
               btn btn-primary px-4 py-2 text-sm rounded-xl
               translate-y-2 opacity-0
               group-hover:translate-y-0 group-hover:opacity-100
               md:opacity-0 md:group-hover:opacity-100
               opacity-100 translate-y-0 md:translate-y-2
             "
            aria-label="Sepete ekle"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
