// Function to load components
function loadComponents() {
    // Load header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('body').insertAdjacentHTML('afterbegin', data);
        })
        .catch(error => console.error('Error loading header:', error));

    // Load footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('body').insertAdjacentHTML('beforeend', data);
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Load components when the page loads
document.addEventListener('DOMContentLoaded', loadComponents); 