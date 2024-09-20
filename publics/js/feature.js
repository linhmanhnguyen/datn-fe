document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(item => {
        item.addEventListener('click', function () {
            const categoryID = this.getAttribute('data-category-id');
            const page = 1; 
            window.location.href = `/v1/sites/features?categoryID=${categoryID}&page=${page}`;
        });
    });
});
