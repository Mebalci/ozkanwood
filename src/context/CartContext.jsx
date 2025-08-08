import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart_items_v1");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart_items_v1", JSON.stringify(items));
  }, [items]);

  const addToCart = (urun, qty = 1) => {
    setItems(prev => {
      const id = urun.id || urun.title; // id yoksa title fallback
      const ix = prev.findIndex(it => it.id === id);
      if (ix >= 0) {
        const copy = [...prev];
        copy[ix] = { ...copy[ix], qty: Math.min(copy[ix].qty + qty, urun.quantity || 999) };
        return copy;
      }
      return [...prev, {
        id,
        title: urun.title,
        brand: urun.brand || "",
        price: urun.salePrice || urun.price,
        // %5 indirim politikanıza göre sepette ödenecek fiyat:
        discounted: Math.round((urun.salePrice || urun.price) * 0.95),
        image: urun.images?.[0],
        qty: Math.min(qty, urun.quantity || 999),
        stock: urun.quantity ?? 999,
      }];
    });
  };

  const removeFromCart = (id) => setItems(prev => prev.filter(it => it.id !== id));
  const setQty = (id, qty) => setItems(prev => prev.map(it => it.id === id ? { ...it, qty: Math.max(1, Math.min(qty, it.stock)) } : it));
  const clearCart = () => setItems([]);

  const total = useMemo(() => items.reduce((acc, it) => acc + it.discounted * it.qty, 0), [items]);
  const count = useMemo(() => items.reduce((acc, it) => acc + it.qty, 0), [items]);

  const value = { items, addToCart, removeFromCart, setQty, clearCart, total, count };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
