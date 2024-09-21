// authCheck.js

// Hàm đọc giá trị của cookie theo tên
function getCookie(name) {
    const cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

// Hàm xóa cookie
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// Hàm kiểm tra cookie và cập nhật giao diện
function checkAuth() {
    const userID = getCookie("userID");
    const authLink = document.getElementById("authLink");

    if (userID) {
        // Nếu đã có userID, hiển thị nút "Đăng xuất"
        authLink.innerText = "Đăng xuất";
        authLink.href = "#";  // Ngăn điều hướng khi bấm nút

        // Khi nhấp vào nút "Đăng xuất"
        authLink.addEventListener("click", function () {
            deleteCookie("userID");  // Xóa cookie userID
            window.location.href = "/v1/sites/auth/login";  // Chuyển hướng về trang đăng nhập
        });
    } else {
        // Nếu không có userID, hiển thị nút "Đăng nhập"
        authLink.innerText = "Đăng nhập";
        authLink.href = "/v1/sites/auth/login";
    }
}

// Gọi hàm kiểm tra khi trang được tải
document.addEventListener("DOMContentLoaded", checkAuth);
