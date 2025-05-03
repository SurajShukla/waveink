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
            
            // After footer is loaded, modify logo color for footer
            const footerLogo = document.querySelector('.footer-logo-svg');
            if (footerLogo) {
                // Change all SVG paths to black color in the footer logo
                const svgPaths = footerLogo.querySelectorAll('path');
                svgPaths.forEach(path => {
                    path.setAttribute('fill', '#242424'); // Using your dark-color variable value
                });
            }
        })
        .catch(error => console.error('Error loading footer:', error));
});

function initHeaderFunctionality() {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Mobile dropdown toggle
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const dropdown = document.querySelector('.dropdown');

    if (window.innerWidth <= 768 && dropdownTrigger) {
        dropdownTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            // Toggle the dropdown arrow rotation
            const arrow = dropdownTrigger.querySelector('::after');
            if (arrow) {
                arrow.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
            }
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (dropdown && !dropdown.contains(e.target) && dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
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
