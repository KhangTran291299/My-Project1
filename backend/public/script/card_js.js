async function removeFromCart(phoneId) {
    const modal = document.getElementById('confirmModal');
    const confirmBtn = document.getElementById("confirmDelete");
    const cancelBtn = document.getElementById("cancelDelete");
    
    // Show modal
    modal.style.display = "flex";
    
    // Handle confirm button
    confirmBtn.onclick = async () => {
        try {
            const response = await fetch(`/card/67c2fc076712ec146f26fa6f/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phoneId })
            });
        
            if (!response.ok) {
                throw new Error("Xóa sản phẩm thất bại!");
            }
            
            // Hide modal and reload page
            modal.style.display = 'none';
            window.location.reload();
            
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            alert('Không thể xóa sản phẩm. Vui lòng thử lại!');
        }
    };

    // Handle cancel button
    cancelBtn.onclick = () => {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}
