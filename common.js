document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('common.html')
        .then(response => response.text())
        .then(data => {
            // Extract header content
            const headerContent = data.split('<!-- Footer Section -->')[0];
            document.getElementById('header-placeholder').innerHTML = headerContent;
            
            // Initialize header functionality after loading
            initHeaderFunctionality();
        })
        .catch(error => console.error('Error loading header:', error));
    
    // Load footer
    fetch('common.html')
        .then(response => response.text())
        .then(data => {
            // Extract footer content
            const footerContent = data.split('<!-- Footer Section -->')[1];
            document.getElementById('footer-placeholder').innerHTML = footerContent;
        })
        .catch(error => console.error('Error loading footer:', error));
});

function initHeaderFunctionality() {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.wave-mobile-menu');
    const navLinks = document.querySelector('.wave-nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Dropdown logic
    const dropdownTrigger = document.querySelector('.wave-dropdown-trigger');
    const dropdownMenu = document.querySelector('.wave-dropdown-menu');

    if (dropdownTrigger && dropdownMenu) {
        // On mobile, toggle dropdown on click
        dropdownTrigger.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                dropdownMenu.classList.toggle('show');
            }
        });
        // Close dropdown when a link is clicked (on mobile)
        dropdownMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 900) {
                    dropdownMenu.classList.remove('show');
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                    }
                }
            });
        });
    }

    // Close dropdowns when clicking outside (desktop)
    document.addEventListener('click', function(e) {
        if (dropdownMenu && !dropdownMenu.contains(e.target) && !dropdownTrigger.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchors to IDs within the same page
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}
