// auth.js - Shared authentication logic for all pages

// Add CSS for the hiden class if not already defined elsewhere
const styleElement = document.createElement('style');
styleElement.textContent = `
.hiden {
    display: none !important;
}
`;
document.head.appendChild(styleElement);

// Check if user is logged in and handle navbar visibility
function checkAuthStatus() {
    const userProfileContainer = document.querySelector('.hiden');
    const loginRegisterSection = document.querySelector('.nav-item:has(a[href="signup.html"])');
    const userLoggedIn = localStorage.getItem('user');

    if (userLoggedIn && loginRegisterSection) {
        // User is logged in
        const userData = JSON.parse(localStorage.getItem('user'));

        // Show user profile dropdown
        if (userProfileContainer) {
            userProfileContainer.style.display = 'block';
            userProfileContainer.classList.remove('hiden');
        }

        // Hide login/register link
        loginRegisterSection.style.display = 'none';

        // Update profile dropdown with user data
        const userNameElement = document.querySelector('#userDropdown strong');
        if (userNameElement && userData) {
            userNameElement.textContent = userData.name || 'User';
        }

        // Update profile modal data if the modal exists
        const modalUsername = document.getElementById("modalUsername");
        const modalEmail = document.getElementById("modalEmail");
        const modalLocation = document.getElementById("modalLocation");

        if (modalUsername && modalEmail && modalLocation && userData) {
            modalUsername.textContent = userData.name || 'N/A';
            modalEmail.textContent = userData.email || 'N/A';
            modalLocation.textContent = userData.location || 'N/A';
        }
    } else if (loginRegisterSection) {
        // User is not logged in
        if (userProfileContainer) {
            userProfileContainer.style.display = 'none';
            userProfileContainer.classList.add('hiden');
        }
        loginRegisterSection.style.display = 'block';
    }
}

// Setup event listeners for auth-related elements
function setupAuthEventListeners() {
    // Handle logout if logout button exists
    const logoutButton = document.querySelector('.dropdown-item:has(i.fa-right-from-bracket)');
    if (logoutButton) {
        logoutButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Clear user data from localStorage
            localStorage.removeItem('user');

            // Show success message
            Toastify({
                text: "Logged out successfully!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                stopOnFocus: true
            }).showToast();

            // Redirect to home page after logout
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1000);
        });
    }

    // Profile link event listener if it exists
    const profileLink = document.getElementById("profileLink");
    if (profileLink) {
        profileLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior
            $('#userModal').modal('show');
        });
    }
}

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Check auth status immediately
    checkAuthStatus();

    // Setup auth event listeners
    setupAuthEventListeners();
}); 