document.addEventListener('DOMContentLoaded', function() {
    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        if (dropbtn && dropdownContent) {
            dropbtn.addEventListener('click', function(event) {
                event.preventDefault();
                // Close other open dropdowns
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    if (content !== dropdownContent) {
                        content.style.display = 'none';
                    }
                });
                // Toggle current dropdown
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            });
        }
    });

    // Close dropdown if clicked outside
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropbtn')) {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.style.display = 'none';
            });
        }
    });

    // Optional: Highlight active page link (basic example)
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage) {
        const navLinks = document.querySelectorAll('#main-nav a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.style.fontWeight = 'bold'; // Or add an 'active' class
                link.style.color = '#0779e4';

                // If it's a dropdown item, also highlight the parent
                let parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    parentDropdown.querySelector('.dropbtn').style.color = '#0779e4';
                }
            }
        });
    }
});