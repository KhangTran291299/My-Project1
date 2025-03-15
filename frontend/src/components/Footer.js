import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "../styles/footer.scss";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Về chúng tôi</h3>
                    <ul>
                        <li><Link to="/about">Giới thiệu</Link></li>
                        <li><Link to="/news">Tin tức</Link></li>
                        <li><Link to="/careers">Tuyển dụng</Link></li>
                        <li><Link to="/contact">Liên hệ</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Hỗ trợ khách hàng</h3>
                    <ul>
                        <li><Link to="/help">Hướng dẫn mua hàng</Link></li>
                        <li><Link to="/warranty">Chính sách bảo hành</Link></li>
                        <li><Link to="/return">Chính sách đổi trả</Link></li>
                        <li><Link to="/shipping">Vận chuyển & Thanh toán</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Kết nối với chúng tôi</h3>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Phone Store. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
