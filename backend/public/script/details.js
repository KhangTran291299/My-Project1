// Hàm cập nhật số lượng giỏ hàng
async function updateCartCount() {
    try {
        const response = await fetch('/cart-count');
        const data = await response.json();
        document.querySelector('.cart-count').textContent = data.count;
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Hàm thêm vào giỏ hàng
async function addToCart(phoneId) {
    try {
        const response = await fetch('/card/67c2fc076712ec146f26fa6f/add', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneId })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        await updateCartCount();
        alert('Đã thêm vào giỏ hàng!');
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Không thể thêm vào giỏ hàng. Vui lòng thử lại!');
    }
}

// Khởi tạo khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    // Cập nhật số lượng giỏ hàng ban đầu
    updateCartCount();
    
    // Xử lý nút mua ngay (tạm thời chỉ hiển thị thông báo)
    const buyNowBtn = document.querySelector('.buy-now');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            alert('Tính năng đang được phát triển!');
        });
    }
});
