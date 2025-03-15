import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Footer from "./components/Footer"; // ✅ Import Footer

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content"> {/* ✅ Thêm class để styling dễ hơn */}
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </main>
          <Footer /> {/* ✅ Thêm Footer vào */}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
