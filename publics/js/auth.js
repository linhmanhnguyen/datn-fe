// Select all elements with the class 'input'
const inputs = document.querySelectorAll(".input");

// Function to add the 'focus' class
function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

// Function to remove the 'focus' class if input is empty
function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value === "") {
        parent.classList.remove("focus");
    }
}

// Attach event listeners to each input element
inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});

// Additional script for handling login form submission
document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Vui lòng nhập email và mật khẩu');
            return;
        }

        fetch('/v1/sites/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.isSuccess) {
                window.location.href = '/v1/sites/';
            } else {
                alert('Email hoặc mật khẩu không đúng');
            }
        })
        .catch(error => {
            console.log('Đã xảy ra lỗi trong quá trình đăng nhập:', error);
            alert('Đã xảy ra lỗi trong quá trình đăng nhập');
        });
    });
});
