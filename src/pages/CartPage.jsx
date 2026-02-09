import { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const formatPrice = (n) => new Intl.NumberFormat("tr-TR").format(n);

// --- SVG ICONS (no FontAwesome dependency) ---
const IconCart = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
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
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconArrowRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M5 12h12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconTrash = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M4 7h16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M10 11v7M14 11v7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M6 7l1 14h10l1-14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const IconWhatsApp = (props) => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19.11 17.53c-.28-.14-1.65-.81-1.9-.9-.26-.1-.45-.14-.64.14-.19.28-.74.9-.9 1.09-.17.19-.33.21-.61.07-.28-.14-1.2-.44-2.29-1.4-.85-.75-1.42-1.68-1.58-1.96-.17-.28-.02-.43.12-.57.12-.12.28-.33.42-.5.14-.17.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.44s1.02 2.84 1.16 3.03c.14.19 2.01 3.06 4.87 4.29.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.12-.26-.19-.54-.33z" />
    <path d="M16 3C9.37 3 4 8.37 4 15c0 2.12.55 4.11 1.52 5.84L4 29l8.37-1.49A11.92 11.92 0 0 0 16 27c6.63 0 12-5.37 12-12S22.63 3 16 3zm0 21.74c-1.76 0-3.4-.48-4.83-1.31l-.35-.2-4.96.88.92-4.83-.23-.37A9.7 9.7 0 0 1 6.26 15c0-5.37 4.37-9.74 9.74-9.74s9.74 4.37 9.74 9.74-4.37 9.74-9.74 9.74z" />
  </svg>
);

export default function CartPage() {
  const { items, removeFromCart, setQty, clearCart, total } = useCart();

  const waMessage = useMemo(() => {
    if (items.length === 0) return "Merhaba, sepette ürün bulunmuyor.";
    const lines = items.map(
      (it, i) =>
        `${i + 1}) ${it.brand ? it.brand + " " : ""}${it.title} x${it.qty} - ${formatPrice(
          it.discounted
        )} ₺ (adet)`
    );
    lines.push(`\nToplam: ${formatPrice(total)} ₺`);
    lines.push("\nTeslimat / adres bilgisi için dönüş yapabilir misiniz?");
    return lines.join("\n");
  }, [items, total]);

  const sendWhatsAppOrder = () => {
    const url = `https://wa.me/905070824608?text=${encodeURIComponent(waMessage)}`;
    window.open(url, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Sepet</h2>

          <div className="max-w-md mx-auto text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-6 text-gray-400">
              <IconCart className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">Sepetiniz Boş</h3>
            <p className="text-gray-600 mb-8">
              Sepetinize henüz ürün eklenmemiş. Hemen alışverişe başlayın!
            </p>

            <Link to="/urunler" className="whatsapp-btn">
              <IconArrowRight className="w-5 h-5" />
              Alışverişe Başla
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Sepet</h2>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          {items.map((it) => (
            <div key={it.id} className="border-b border-gray-200 last:border-b-0 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex gap-4 flex-1">
                  {it.image && (
                    <img
                      src={it.image}
                      alt={it.title}
                      className="w-24 h-24 object-cover rounded-xl bg-gray-100"
                      loading="lazy"
                    />
                  )}
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 mb-1">
                      {it.brand ? `${it.brand} ` : ""}
                      {it.title}
                    </div>
                    <div className="text-gray-600">
                      {formatPrice(it.discounted)} ₺ <small>/ adet</small>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQty(it.id, Math.max(1, it.qty - 1))}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      aria-label="Azalt"
                      type="button"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={it.stock}
                      value={it.qty}
                      onChange={(e) => setQty(it.id, Number(e.target.value))}
                      className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button
                      onClick={() => setQty(it.id, Math.min(it.stock, it.qty + 1))}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      aria-label="Arttır"
                      type="button"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[140px]">
                    <div className="font-bold text-lg text-gray-900 mb-2">
                      {formatPrice(it.discounted * it.qty)} ₺
                    </div>
                    <button
                      onClick={() => removeFromCart(it.id)}
                      className="text-red-600 hover:text-red-800 text-sm inline-flex items-center gap-1"
                      type="button"
                    >
                      <IconTrash className="w-4 h-4" />
                      Kaldır
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
            <span className="text-xl font-semibold text-gray-700">Ara Toplam</span>
            <strong className="text-3xl font-bold text-gray-900">{formatPrice(total)} ₺</strong>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <button
              onClick={clearCart}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-colors"
              type="button"
            >
              <IconTrash className="w-5 h-5" />
              Sepeti Temizle
            </button>

            <button onClick={sendWhatsAppOrder} className="flex-1 whatsapp-btn" type="button">
              <IconWhatsApp className="w-5 h-5" />
              WhatsApp'tan Sipariş Gönder
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Sipariş mesajınız WhatsApp'ta otomatik hazırlanır; gönderip onaylayın. 🎯
          </p>
        </div>
      </div>
    </div>
  );
}
