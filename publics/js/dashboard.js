
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

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`http://localhost:3300/v1/sites/products/${productId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    const productElement = document.getElementById(`product-${productId}`);
                    if (productElement) {
                        productElement.remove();
                    }
                    location.reload();
                    alert('Product deleted successfully');
                } else {
                    alert('Error deleting product');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error deleting product');
            });
    }
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



function toggleUpdateForm(productId) {
    document.getElementById("productModal").style.display = "block";

    fetch(`http://localhost:3300/v1/sites/products/detail/?productID=${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const product = data.data;

            document.getElementById("tenSanPham").value = product.tenSanPham || "";
            document.getElementById("phienBan").value = product.phienBan || "";
            document.getElementById("giaBan").value = product.giaBan || "";
            document.getElementById("sale").value = product.sale || "";
            document.getElementById("mauSac").value = product.mauSac || "";
            document.getElementById("nhanHieu").value = product["Nhãn hiệu"] || ""; 
            document.getElementById("loaiSanPhamID").value = product.loaiSanPhamID || "";

            const promotionContainer = document.getElementById("promotionContainer");
            promotionContainer.innerHTML = '';
            product.khuyenMai.forEach(khuyenMai => {
                const newPromotion = document.createElement("div");
                newPromotion.classList.add("promotion");
                newPromotion.innerHTML = `
            <input type="text" name="khuyenMaiChiTiet[]" value="${khuyenMai.chiTiet}" required>
            <input type="text" name="khuyenMaiUrl[]" value="${khuyenMai.url}">
            <button type="button" class="removePromotion" onclick="removePromotion(this)">Xóa</button>
        `;
                promotionContainer.appendChild(newPromotion);
            });
            const productInfoContainer = document.getElementById("productInfoContainer");

            productInfoContainer.innerHTML = '';  

            product.thongTinSanPham.forEach(info => {
                const newInfoGroup = document.createElement("div");
                newInfoGroup.classList.add("productInfoGroup");
                newInfoGroup.innerHTML = `
            <input type="text" name="thongTinSanPham[]" placeholder="Thông Tin Sản Phẩm" value="${info}" required>
            <button type="button" class="removeProductInfo">Xóa</button>
        `;
                productInfoContainer.appendChild(newInfoGroup);
            });


            const specGroupContainer = document.getElementById("specGroupContainer");
            specGroupContainer.innerHTML = ''; 

            for (const [key, specs] of Object.entries(product.thongSoKyThuat)) {
                const newSpecGroup = document.createElement("div");
                newSpecGroup.classList.add("specGroup");
                newSpecGroup.innerHTML = `
            <h4>${key}</h4>
            <table class="technicalSpecsTable">
                <tbody>
                    ${Object.entries(specs).map(([specName, specDetail]) => `
                        <tr>
                            <td><input type="text" name="tenThongSo" placeholder="Tên Thông Số" value="${specName}" required></td>
                            <td><input type="text" name="chiTietThongSo" placeholder="Chi Tiết" value="${specDetail}" required></td>
                            <td><button type="button" class="removeRow">Xóa</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <button type="button" class="addSpecRow">Thêm Thông Số</button>
        `;
                specGroupContainer.appendChild(newSpecGroup);
            }

        })
        .catch(error => {
            console.error('Error fetching product details:', error);
        });

}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

function addPromotion() {
    const promotionContainer = document.getElementById("promotionContainer");
    const newPromotion = document.createElement("div");
    newPromotion.classList.add("promotion");
    newPromotion.innerHTML = `
        <input type="text" name="khuyenMaiChiTiet[]" required>
        <input type="text" name="khuyenMaiUrl[]">
        <button type="button" class="removePromotion" onclick="removePromotion(this)">Xóa</button>
    `;
    promotionContainer.appendChild(newPromotion);
}

function removePromotion(button) {
    button.parentElement.remove();
}

document.getElementById("productForm").onsubmit = function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productId = document.getElementById("productId").value;
    const data = {};

    formData.forEach((value, key) => {
        if (key.includes('khuyenMaiChiTiet') || key.includes('khuyenMaiUrl')) {
            if (!data.khuyenMai) data.khuyenMai = [];
            const index = key.includes('ChiTiet') ? 'chiTiet' : 'url';
            const i = Array.from(formData.keys()).indexOf(key);
            if (!data.khuyenMai[i]) data.khuyenMai[i] = {};
            data.khuyenMai[i][index] = value;
        } else {
            data[key] = value;
        }
    });

    const url = `http://localhost:3300/v1/sites/products/${productId}`
    const method = 'PUT';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            document.getElementById("productModal").style.display = "none";
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


document.getElementById("productOpenModal").onclick = function () {
    document.getElementById("productModal").style.display = "block";
}

document.getElementsByClassName("product-modal-close")[0].onclick = function () {
    document.getElementById("productModal").style.display = "none";
}

window.onclick = function (event) {
    if (event.target == document.getElementById("productModal")) {
        document.getElementById("productModal").style.display = "none";
    }
}

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("addSpecRow")) {
        const specGroup = event.target.closest(".specGroup");
        const tableBody = specGroup.querySelector(".technicalSpecsTable tbody");
        const newRow = tableBody.insertRow();

        newRow.innerHTML = `
        <td><input type="text" name="tenThongSo" placeholder="Tên Thông Số"></td>
        <td><input type="text" name="chiTietThongSo" placeholder="Chi Tiết"></td>
        <td><button type="button" class="removeRow">Xóa</button></td>`;
    }
});

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("removeRow")) {
        const row = event.target.closest("tr");
        row.parentNode.removeChild(row);
    }
});

document.getElementById("addPromotion").onclick = function () {
    const promotionContainer = document.getElementById("promotionContainer");
    const newPromotion = document.createElement("div");
    newPromotion.classList.add("promotion");

    newPromotion.innerHTML = `
    <input type="text" name="khuyenMaiChiTiet[]" placeholder="Chi Tiết Khuyến Mãi">
    <input type="text" name="khuyenMaiUrl[]" placeholder="URL" />
    <button type="button" class="removePromotion">Xóa</button>`;
    promotionContainer.appendChild(newPromotion);
}

document.getElementById("addProductInfo").onclick = function () {
    const productInfoContainer = document.getElementById("productInfoContainer")
    const newProductInfo = document.createElement("div");
    newProductInfo.classList.add("productInfoGroup");

    newProductInfo.innerHTML = `
<input type="text" name="thongTinSanPham[]" placeholder="Thông Tin Sản Phẩm">
<button type="button" class="removeProductInfo">Xóa</button>
`;
    productInfoContainer.appendChild(newProductInfo);
};

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("removePromotion")) {
        const promotion = event.target.closest(".promotion");
        promotion.parentNode.removeChild(promotion);
    }
});




document.getElementById("productForm").onsubmit = function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};

    data["rate"] = 0;
    data["luotBanHang"] = 0;
    data["tinhTrangHang"] = "Còn hàng";

    data["imgDefault"] = "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/man-hinh-xiaomi-a27i-ela5345eu-27-inch.png"
    data["imgHover"] = "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/man-hinh-xiaomi-a27i-ela5345eu-27-inch.png"



    // ===============================================================================

    data["thongSoKyThuat"] = {};

    document.querySelectorAll(".specGroup").forEach(specGroup => {
        const loaiThongSo = specGroup.querySelector(".specType");

        const thongSoChiTiet = {};

        specGroup.querySelectorAll(".technicalSpecsTable tbody tr").forEach(row => {
            const specName = row.querySelector('input[name="tenThongSo"]').value.trim();
            const specValue = row.querySelector('input[name="chiTietThongSo"]').value.trim();

            if (specName) {
                thongSoChiTiet[specName] = specValue;
            }

            console.log(JSON.stringify(thongSoChiTiet));
        });

        if (loaiThongSo) {
            // Sử dụng loaiThongSo làm khóa
            data["thongSoKyThuat"][loaiThongSo] = thongSoChiTiet;
        }
    });


    // ===============================================================================

    data["khuyenMai"] = [];
    document.querySelectorAll(".promotion").forEach(promotion => {
        const khuyenMaiChiTiet = promotion.querySelector('input[name="khuyenMaiChiTiet[]"]').value;
        const khuyenMaiURL = promotion.querySelector('input[name="khuyenMaiUrl[]"]').value;

        data["khuyenMai"].push({
            chiTiet: khuyenMaiChiTiet || "",
            url: khuyenMaiURL || ""
        });
    });

    data["thongTinSanPham"] = [];
    formData.forEach((value, key) => {
        if (key.startsWith('thongTinSanPham') && value.trim() !== "") {
            data["thongTinSanPham"].push(value.trim());
        } else if (!data[key] && value.trim() !== "") {
            data[key] = value;
        }
    });

    formData.forEach((value, key) => {
        if (!data[key] && !["khuyenMaiChiTiet[]", "khuyenMaiUrl[]", "tenThongSo", "chiTietThongSo", "thongTinSanPham[]"].includes(key)) {
            data[key] = value;
        }
    });

    fetch('http://localhost:3300/v1/sites/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {

            console.log(responseData.thongSoKyThuat)

            document.getElementById("productModal").style.display = "none";
        })
        .catch(error => {
            console.error('Error:', error);
        });

}



function saveUpdateProduct(productID) {
    const form = document.querySelector(`#update-form-${productID}`);
    const formData = new FormData(form);

    const updatedFields = {};

    formData.forEach((value, key) => {
        updatedFields[key] = value;
    });

    if (Object.keys(updatedFields).length > 0) {
        updateProductStatus(productID, updatedFields);
    } else {
        alert('Please select a status before saving.');
    }
}

