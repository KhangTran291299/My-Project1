// Hàm thêm vào giỏ hàng
async function addToCart(phoneId, event) {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan ra thẻ cha
    try {
        console.log('Adding to cart:', phoneId);
        const response = await fetch('/card/67c2fc076712ec146f26fa6f/add', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneId })
        });

        const result = await response.json();

        if (!response.ok) {
            if (response.status === 400) {
                alert(result.message); // Hiển thị thông báo sản phẩm đã có trong giỏ
                return;
            }
            throw new Error(result.message || 'Network response was not ok');
        }

        await updateCartCount();
        alert('Đã thêm vào giỏ hàng!');
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Không thể thêm vào giỏ hàng. Vui lòng thử lại!');
    }
}
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

// Initialization khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    // Xử lý nút like
    const likeButtons = document.querySelectorAll('.like-btn .fa-heart');
    likeButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            this.classList.toggle('selected');
        });
    });

document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.querySelector('.search-box');
    let timeoutId;

    searchBox.addEventListener('input', function() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
            const searchQuery = this.value.trim();
            if (searchQuery.length > 0) {
                try {
                    const response = await fetch(`/search?q=${encodeURIComponent(searchQuery)}`);
                    if (response.ok) {
                        window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                    }
                } catch (error) {
                    console.error('Search error:', error);
                }
            }
        }, 500);
    });
});

    // Cập nhật số lượng giỏ hàng
    updateCartCount();
});
