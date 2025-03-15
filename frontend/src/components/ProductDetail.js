import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById, addToCart } from "../api";
import { useCart } from "../context/CartContext"; // ✅ Import useCart
import "../styles/details.scss";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { updateCartCount } = useCart(); // ✅ Lấy hàm cập nhật giỏ hàng

  useEffect(() => {
    fetchProductById(id).then(setProduct);
    document.title = "Chi tiết sản phẩm";
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart("67c2fc076712ec146f26fa6f", product._id);
      updateCartCount(); // ✅ Cập nhật số lượng giỏ hàng ngay lập tức
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  if (!product) return <p className="loading">Đang tải...</p>;

  return (
    <div className="product-details">
      <img src={product.image[0]} alt={product.name} />
      <div className="details-content">
        <h2>{product.name}</h2>
        <p>RAM: {product.ram}GB - ROM: {product.rom}GB</p>
        <p className="price">Giá: {product.price.toLocaleString()} VND</p>
        
        {/* 📌 Thêm mô tả sản phẩm */}
        <p className="description">{product.description}</p>

        <button className="add-to-cart" onClick={handleAddToCart}>
          🛒 Thêm vào giỏ hàng
        </button>
        <Link to="/" className="back-link">⬅ Quay lại</Link>
      </div>
    </div>
  );
}

export default ProductDetail;
