function toggleUpdateForm(orderId) {
    const form = document.getElementById(`update-form-${orderId}`);
    form.style.display = form.style.display === 'none' ? 'table-row' : 'none';
}

function deleteOrder(orderId) {
    fetch(`http://localhost:3300/v1/sites/order/${orderId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            document.getElementById(`order-${orderId}`).remove();

            location.reload();
        } else {
            alert('Error deleting order');
        }
    });
}

function updateOrderStatus(newStatusId, orderId) {
    fetch(`http://localhost:3300/v1/sites/order/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trangThaiDonHang: newStatusId })
    })
    .then(response => {
        if (response.ok) {
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

    // Check if a status is selected before updating
    if (newStatusId) {
        updateOrderStatus(newStatusId, orderId);
    } else {
        alert('Please select a status before saving.');
    }
}
