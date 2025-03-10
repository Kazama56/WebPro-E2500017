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
        alert('Passwords do not match!');
        return;
    }

    alert('Registration successful!');
    window.location.href='home.html';
});

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Login successful!');
    window.location.href='home.html';
});
