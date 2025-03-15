import { createContext, useContext, useState, useEffect } from "react";
import { fetchCartCount } from "../api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  // ✅ Hàm cập nhật số lượng giỏ hàng
  const updateCartCount = async () => {
    try {
      const data = await fetchCartCount();
      setCartCount(data?.count || 0);
    } catch (error) {
      console.error("Lỗi khi lấy số lượng giỏ hàng:", error);
    }
  };

  useEffect(() => {
    updateCartCount();
  }, []); // ✅ Chỉ chạy 1 lần khi load trang

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
