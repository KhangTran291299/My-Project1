import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, addToCart } from "../api";
import { useCart } from "../context/CartContext"; // ✅ Import useCart
import "../styles/product.scss";

function ProductList() {
  const [products, setProducts] = useState([]);
  const { updateCartCount } = useCart(); // ✅ Lấy hàm cập nhật giỏ hàng

  useEffect(() => {
    fetchProducts().then(setProducts);
    document.title = "Danh sách sản phẩm";
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart("67c2fc076712ec146f26fa6f", productId);
      updateCartCount(); // ✅ Cập nhật số lượng giỏ hàng ngay sau khi thêm
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  return (
    <div className="container">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img src={product.image[0]} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.rom}GB - {product.ram}GB <br></br><br></br> {product.color.join(", ")}</p>
          <p className="price">{product.price.toLocaleString()} VND</p>
          <div className="button-group">
            <button onClick={() => handleAddToCart(product._id)}>Thêm vào giỏ</button> {/* ✅ Gọi hàm mới */}
            <Link to={`/product/${product._id}`}>Xem chi tiết</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
