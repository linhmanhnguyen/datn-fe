function toggleUpdateForm(orderId, email) {
    const updateForm = document.getElementById(`update-form-${orderId}`);
    const isVisible = updateForm.style.display === 'table-row';

    // Hiện/ẩn form cập nhật
    updateForm.style.display = isVisible ? 'none' : 'table-row';
    
    // Cập nhật status cho order
    const select = updateForm.querySelector('.select-order-status');
    select.setAttribute('data-email', email); // Lưu email vào select
}


function deleteOrder(orderId) {
    if (confirm('Bạn chắc chắn muốn xóa?')) {
        fetch(`http://localhost:3300/v1/sites/order/${orderId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    const productElement = document.getElementById(`order-${orderId}`);
                    if (productElement) {
                        productElement.remove();
                    }
                    location.reload();
                    alert('Xóa thành công');
                } else {
                    alert('Đã xảy ra lỗi khi xóa');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error deleting product');
            });
    }
}

function updateOrderStatus(newStatusId, orderId) {
    const select = document.querySelector(`#update-form-${orderId} .select-order-status`);
    const email = select.getAttribute('data-email'); // Lấy email từ thuộc tính data-email

    fetch(`http://localhost:3300/v1/sites/order/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trangThaiDonHang: newStatusId })
    })
    .then(response => {
        if (response.ok) {
            // Kiểm tra trạng thái mới là đã xác nhận hay không
            if (newStatusId === '66ed3f4d627473063b5bb04d') { // Thay bằng ID thực tế
                // Gọi API gửi thông báo
                fetch('http://localhost:3300/v1/sites/response/dang-xu-ly', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ orderId, email }) 
                })
                .then(notificationResponse => {
                    if (!notificationResponse.ok) {
                        alert('Error sending notification');
                    }
                });
            }

            toggleUpdateForm(orderId);
            location.reload();
        } else {
            alert('Error updating order status');
        }
    });
}


function saveUpdate(orderId) {
    const select = document.querySelector(`#update-form-${orderId} select`);
    const newStatusId = select.value;

    if (newStatusId) {
        updateOrderStatus(newStatusId, orderId);
        location.reload();
    } else {
        alert('Please select a status before saving.');
    }
}

// --------------------------------------------------------------------------------------

function updateOrder(productID, updatedFields) {
    fetch(`http://localhost:3300/v1/sites/products/${productID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFields)
    })
        .then(response => {
            if (response.ok) {
                toggleUpdateForm(productID);
                location.reload();
            } else {
                alert('Error updating product status');
            }
        });
}
