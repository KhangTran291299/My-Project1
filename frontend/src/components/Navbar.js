import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import "../styles/navbar.scss";

function Navbar() {
  const { cartCount, updateCartCount } = useCart();

  useEffect(() => {
    updateCartCount(); // ✅ Gọi API để cập nhật số lượng giỏ hàng
  }, [updateCartCount]);

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Danh sách sản phẩm
        </NavLink>
      </div>
        <NavLink to="/cart" className="nav-link cart-container">
          🛒 Giỏ hàng ({cartCount})
        </NavLink>
    </nav>
  );
}

export default Navbar;
