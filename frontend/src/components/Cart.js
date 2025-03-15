import { useState, useEffect } from "react";
import { fetchCart, removeFromCart } from "../api";
import { useCart } from "../context/CartContext"; // Import context
import "../styles/cart.scss";

function Cart() {
  const [cart, setCart] = useState(null);
  const { setCartCount } = useCart(); // Lấy hàm cập nhật giỏ hàng

  useEffect(() => {
    async function loadCart() {
      try {
        const data = await fetchCart();
        setCart(data);
        setCartCount(data?.phones?.length || 0); // ✅ Đảm bảo không bị lỗi nếu `data` là null
        document.title = "Giỏ hàng";
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    }

    loadCart();
  }, [setCartCount]); // ✅ Thêm `setCartCount` vào dependency array

  const handleRemove = async (cartId, phoneId) => {
    try {
      await removeFromCart(cartId, phoneId);
      setCart((prevCart) => {
        const updatedCart = {
          ...prevCart,
          phones: prevCart.phones.filter((item) => item._id !== phoneId),
        };
        setCartCount(updatedCart.phones.length); // ✅ Cập nhật số lượng giỏ hàng
        return updatedCart;
      });
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <div className="cart-container">
      {cart.phones.map((item) => (
        <div key={item._id} className="cart-item">
          <img src={item.image[0]} alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.rom}GB - {item.ram}GB</p>
          <p>{item.price.toLocaleString()} VND</p>
          <button onClick={() => handleRemove("67c2fc076712ec146f26fa6f", item._id)}>Xóa</button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
