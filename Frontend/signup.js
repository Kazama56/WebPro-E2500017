const registerBtn = document.getElementById("register-btn")
const loginbtn = document.getElementById("login-btn")
document.getElementById('show-login').addEventListener('click', function () {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
});

document.getElementById('show-register').addEventListener('click', function () {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
});

document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password !== confirmPassword) {
        Toastify({
            text: "Passwords do not match!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
            stopOnFocus: true,

        }).showToast();
        return;
    }

    Toastify({
        text: "Registration successful!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true
    }).showToast();

    setTimeout(() => {
        document.getElementById('login-form').classList.remove('hidden');
        document.getElementById('register-form').classList.add('hidden');
    }, 2000);
});

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
});

registerBtn.addEventListener("click", async () => {
    const email = document.getElementById("register-email").value;
    const pass = document.getElementById("register-password").value;
    const location = document.getElementById("register-location").value;
    const username = document.getElementById("register-name").value;

    try {
        const response = await axios.post("http://localhost:8000/signup", {
            email: email,
            password: pass,
            name: username,
            location: location
        });

        if (response.data.message === "User created") {
            Toastify({
                text: "Account created successfully! You can now log in.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                stopOnFocus: true
            }).showToast();

            setTimeout(() => {
                document.getElementById('login-form').classList.remove('hidden');
                document.getElementById('register-form').classList.add('hidden');
            }, 2000);
        }
    } catch (error) {
        Toastify({
            text: "Registration failed! Please try again.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
            stopOnFocus: true
        }).showToast();
        console.error("Registration error:", error);
    }
});

loginbtn.addEventListener("click", async () => {
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-password").value;

    try {
        const response = await axios.post("http://localhost:8000/login", { email: email, password: pass });
        console.log(response);

        if (response.data.success) {
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.data));

            Toastify({
                text: "Login successful!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                stopOnFocus: true
            }).showToast();

            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2000);
        } else {
            Toastify({
                text: response.data.message,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
                stopOnFocus: true
            }).showToast();
        }
    } catch (error) {
        Toastify({
            text: "Login failed! Please check your credentials.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
            stopOnFocus: true
        }).showToast();
        console.error("Login error:", error);
    }
});
