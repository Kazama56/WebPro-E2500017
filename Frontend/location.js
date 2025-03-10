// Dummy user details (replace this with real data from your backend)
const userDetails = {
    username: "JohnDoe",
    email: "johndoe@example.com",
    location: "Kathmandu, Nepal"
};

document.getElementById("profileLink").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior

    // Populate the modal with user details
    document.getElementById("modalUsername").textContent = userDetails.username;
    document.getElementById("modalEmail").textContent = userDetails.email;
    document.getElementById("modalLocation").textContent = userDetails.location;

    // Show the modal (using Bootstrap's modal functionality)
    $('#userModal').modal('show');
});
