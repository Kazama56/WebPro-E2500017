// Set up star rating functionality
function initializeStarRating() {
    const stars = document.querySelectorAll('.star-rating-input');
    const ratingValue = document.getElementById('rating-value');
    const ratingText = document.querySelector('.rating-text');
    const ratingDescriptions = [
        'Select your rating',
        'Poor',
        'Fair',
        'Good',
        'Very Good',
        'Excellent'
    ];
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            ratingValue.value = rating;

            // Update text description
            ratingText.textContent = ratingDescriptions[rating];

            // Reset all stars
            stars.forEach(s => s.className = 'far fa-star fa-lg star-rating-input');

            // Fill stars up to the selected rating
            for (let i = 0; i < stars.length; i++) {
                if (i < rating) {
                    stars[i].className = 'fas fa-star fa-lg star-rating-input active';
                }
            }
        });
        // Hover effects for better UX
        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            // Fill stars up to the hovered one
            for (let i = 0; i < stars.length; i++) {
                if (i < rating) {
                    stars[i].className = 'fas fa-star fa-lg star-rating-input';
                } else {
                    stars[i].className = 'far fa-star fa-lg star-rating-input';
                }
            }
        });
        // Reset to selected rating when mouse leaves
        star.addEventListener('mouseout', () => {
            const selectedRating = parseInt(ratingValue.value);

            stars.forEach((s, i) => {
                if (i < selectedRating) {
                    s.className = 'fas fa-star fa-lg star-rating-input active';
                } else {
                    s.className = 'far fa-star fa-lg star-rating-input';
                }
            });
        });
    });
}

// Set a rating in the star UI
function setRating(rating) {
    const stars = document.querySelectorAll('.star-rating-input');
    const ratingValue = document.getElementById('rating-value');
    const ratingText = document.querySelector('.rating-text');

    const ratingDescriptions = [
        'Select your rating',
        'Poor',
        'Fair',
        'Good',
        'Very Good',
        'Excellent'
    ];

    // Set the hidden input value
    ratingValue.value = rating;

    // Update text description
    ratingText.textContent = ratingDescriptions[rating];

    // Update star UI
    stars.forEach((s, i) => {
        if (i < rating) {
            s.className = 'fas fa-star fa-lg star-rating-input active';
        } else {
            s.className = 'far fa-star fa-lg star-rating-input';
        }
    });
}

// Check if user is logged in
function isUserLoggedIn() {
    return localStorage.getItem('user') !== null;
}

// Get current user ID
function getCurrentUserId() {
    if (!isUserLoggedIn()) return null;

    try {
        const userData = JSON.parse(localStorage.getItem('user'));
        return userData._id;
    } catch (error) {
        console.error('Error getting user ID:', error);
        return null;
    }
}

// Check if user already has a review
async function checkUserReview() {
    if (!isUserLoggedIn()) return null;

    try {
        const userId = getCurrentUserId();
        const response = await fetch(`http://localhost:8000/reviews/user/${userId}`);
        const data = await response.json();
        return data.exists ? data.data : null;
    } catch (error) {
        console.error('Error checking user review:', error);
        return null;
    }
}

// Fetch and display reviews
async function fetchData() {
    try {
        const response = await fetch('http://localhost:8000/reviews');
        const data = await response.json();
        const container = document.querySelector('.reviews-container');

        // Clear any existing content
        container.innerHTML = '';

        if (data.data && data.data.length > 0) {
            data.data.forEach(review => {
                // Create a professional-looking review card
                const reviewElement = document.createElement('div');
                reviewElement.classList.add('review-card', 'mb-4', 'p-4', 'bg-white', 'shadow-sm', 'rounded');

                // Create the header with user info and rating
                const headerRow = document.createElement('div');
                headerRow.classList.add('header-row');

                // User info section
                const userInfo = document.createElement('div');
                userInfo.classList.add('d-flex', 'align-items-center');

                // Add user icon
                const userIcon = document.createElement('div');
                userIcon.classList.add('user-icon', 'mr-3');
                userIcon.innerHTML = `<i class="fas fa-user-circle fa-2x text-primary"></i>`;

                // Add username with styling
                const userName = document.createElement('h5');
                userName.classList.add('mb-0', 'font-weight-bold');
                userName.textContent = review.userid.name;

                // Add elements to userInfo
                userInfo.appendChild(userIcon);
                userInfo.appendChild(userName);

                // Add userInfo to headerRow
                headerRow.appendChild(userInfo);

                // Add userInfo to headerRow
                const ratingDateRow = document.createElement('div');
                ratingDateRow.classList.add('rating-date-row', 'mt-2');

                // Create star rating display
                const ratingDisplay = document.createElement('div');
                ratingDisplay.classList.add('d-flex', 'align-items-center');

                // Get rating from review or default to 0
                const rating = review.rating || 0;

                // Create star display
                for (let i = 1; i <= 5; i++) {
                    const starIcon = document.createElement('i');
                    if (i <= rating) {
                        starIcon.className = 'fas fa-star star-rating-display';
                    } else {
                        starIcon.className = 'far fa-star star-rating-display empty';
                    }
                    ratingDisplay.appendChild(starIcon);
                }

                // Add rating text
                const ratingText = document.createElement('span');
                ratingText.classList.add('ml-2', 'small', 'text-muted');
                ratingText.textContent = rating > 0 ? `${rating}/5` : 'No rating';
                ratingDisplay.appendChild(ratingText);

                // Add timestamp
                const timestamp = document.createElement('small');
                timestamp.classList.add('text-muted');
                const date = review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recently';
                timestamp.textContent = date;

                // Add rating and date to row
                ratingDateRow.appendChild(ratingDisplay);
                ratingDateRow.appendChild(timestamp);

                // Create review content
                const reviewContent = document.createElement('div');
                reviewContent.classList.add('review-content', 'mt-3');

                // Add quote icon at the beginning of the review
                const quoteIcon = document.createElement('i');
                quoteIcon.classList.add('fas', 'fa-quote-left', 'text-muted', 'mr-2');
                reviewContent.appendChild(quoteIcon);

                // Add the review text
                reviewContent.appendChild(document.createTextNode(' ' + review.review));

                // Assemble the review card
                reviewElement.appendChild(headerRow);
                reviewElement.appendChild(ratingDateRow);
                reviewElement.appendChild(reviewContent);

                // Add to container
                container.appendChild(reviewElement);
            });
        } else {
            // Show message if no reviews
            container.innerHTML = `
                <div class="alert alert-info">
                    <i class="fas fa-info-circle mr-2"></i>
                    No reviews yet. Be the first to share your experience!
                </div>
            `;
        }

        console.log('Fetched data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);

        // Show error message
        const container = document.querySelector('.reviews-container');
        container.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                Unable to load reviews. Please try again later.
            </div>
        `;
    }
}

// Update button and form title based on whether user is editing or creating a review
function updateReviewFormState(isEditing) {
    const submitBtn = document.getElementById("btn-submit");
    const formTitle = document.querySelector('#review-form-1 h4');

    if (isEditing) {
        submitBtn.textContent = "Update Review";
        formTitle.innerHTML = '<i class="fas fa-edit mr-2"></i> Edit Your Review';
    } else {
        submitBtn.textContent = "Submit Review";
        formTitle.innerHTML = '<i class="fas fa-pencil-alt mr-2"></i> Write Your Review';
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', async function () {
    fetchData();
    initializeStarRating();

    const submitbtn = document.getElementById("btn-submit");
    const reviewBtn = document.getElementById("review-btn");
    const loginRequiredMessage = document.querySelector('.login-required-message');
    const reviewTextarea = document.getElementById("Textreview");

    let isEditingReview = false;

    // Show/hide review form
    reviewBtn.addEventListener("click", async function () {
        const reviewForm = document.getElementById('review-form-1');

        // Check if user is logged in
        if (!isUserLoggedIn()) {
            reviewForm.classList.remove('hidden');
            // Show login required message
            loginRequiredMessage.classList.remove('d-none');
            // Disable submit button
            submitbtn.disabled = true;
            return;
        }

        // Hide login required message
        loginRequiredMessage.classList.add('d-none');
        // Enable submit button
        submitbtn.disabled = false;

        // Check if user already has a review
        const existingReview = await checkUserReview();

        if (existingReview) {
            // User has an existing review - set form to edit mode
            isEditingReview = true;
            reviewTextarea.value = existingReview.review;
            setRating(existingReview.rating);
            updateReviewFormState(true);

            // Show toast notification
            Toastify({
                text: "You already have a review. You can edit it below.",
                duration: 4000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #ff7e5f, #feb47b)",
                stopOnFocus: true
            }).showToast();
        } else {
            // New review
            isEditingReview = false;
            reviewTextarea.value = '';
            setRating(0);
            updateReviewFormState(false);
        }

        reviewForm.classList.remove('hidden');
    });

    // Handle review submission
    submitbtn.addEventListener("click", async (e) => {
        e.preventDefault();

        // Check if user is logged in
        if (!isUserLoggedIn()) {
            Toastify({
                text: "Please log in to submit a review.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
                stopOnFocus: true
            }).showToast();
            return;
        }

        const review = document.getElementById("Textreview").value;
        const rating = document.getElementById("rating-value").value;

        // Validate input
        if (!review.trim()) {
            Toastify({
                text: "Please enter a review first!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
                stopOnFocus: true
            }).showToast();
            return;
        }

        if (rating === "0") {
            Toastify({
                text: "Please select a rating!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
                stopOnFocus: true
            }).showToast();
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/reviews", {
                review: review,
                rating: parseInt(rating),
                user: localStorage.getItem("user")
            });

            const message = response.data.isUpdate
                ? "Your review has been updated successfully!"
                : "Review submitted successfully!";

            Toastify({
                text: message,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                stopOnFocus: true
            }).showToast();

            // Reset form
            document.getElementById("Textreview").value = "";
            document.getElementById("rating-value").value = "0";
            const stars = document.querySelectorAll('.star-rating-input');
            stars.forEach(s => s.className = 'far fa-star fa-lg star-rating-input');
            document.querySelector('.rating-text').textContent = 'Select your rating';

            // Hide the review form
            document.getElementById('review-form-1').classList.add('hidden');

            // Reset editing state
            isEditingReview = false;
            updateReviewFormState(false);

            // Refresh reviews
            fetchData();
        } catch (error) {
            console.error("Error submitting review:", error);

            Toastify({
                text: "Failed to submit review. Please try again.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
                stopOnFocus: true
            }).showToast();
        }
    });
});
