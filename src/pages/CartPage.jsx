import { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./CartPage.css";

const formatPrice = (n) => new Intl.NumberFormat("tr-TR").format(n);

export default function CartPage() {
  const { items, removeFromCart, setQty, clearCart, total } = useCart();

  const waMessage = useMemo(() => {
    if (items.length === 0) return "Merhaba, sepette ürün bulunmuyor.";
    const lines = items.map((it, i) =>
      `${i + 1}) ${it.brand ? it.brand + " " : ""}${it.title} x${it.qty} - ${formatPrice(it.discounted)} ₺ (adet)`
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
      <div className="cart-page container">
        <h2>Sepet</h2>
        <p>Sepetiniz boş.</p>
        <Link to="/urunler" className="btn btn-primary">Alışverişe Başla</Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h2>Sepet</h2>

      <div className="cart-table">
        {items.map((it) => (
          <div key={it.id} className="cart-row">
            <div className="cart-item-left">
              {it.image && <img src={it.image} alt={it.title} className="cart-thumb" />}
              <div className="cart-info">
                <div className="cart-title">{it.brand ? `${it.brand} ` : ""}{it.title}</div>
                <div className="cart-price">{formatPrice(it.discounted)} ₺ <small>/ adet</small></div>
              </div>
            </div>

            <div className="cart-actions">
              <div className="qty-control">
                <button onClick={() => setQty(it.id, Math.max(1, it.qty - 1))} className="qty-btn">-</button>
                <input
                  type="number"
                  min="1"
                  max={it.stock}
                  value={it.qty}
                  onChange={(e) => setQty(it.id, Number(e.target.value))}
                />
                <button onClick={() => setQty(it.id, Math.min(it.stock, it.qty + 1))} className="qty-btn">+</button>
              </div>
              <div className="row-right">
                <div className="row-total">{formatPrice(it.discounted * it.qty)} ₺</div>
                <button className="remove-btn" onClick={() => removeFromCart(it.id)}>Kaldır</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="sum-line">
          <span>Ara Toplam</span>
          <strong>{formatPrice(total)} ₺</strong>
        </div>
        <div className="sum-actions">
          <button className="btn btn-outline-danger" onClick={clearCart}>Sepeti Temizle</button>
          <button className="btn btn-success" onClick={sendWhatsAppOrder}>WhatsApp’tan Sipariş Gönder</button>
        </div>
        <p className="muted">Sipariş mesajınız WhatsApp’ta otomatik hazırlanır; gönderip onaylayın. 🎯</p>
      </div>
    </div>
  );
}
