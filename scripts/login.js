const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginAlert = document.getElementById('login-alert');

loginForm.addEventListener('submit', (e) => {
    let messages = [];

    if (!loginEmail.value.trim()) {
        messages.push("✖ Email is required");
    } else if (!/\S+@\S+\.\S+/.test(loginEmail.value)) {
        messages.push("✖ Email format is invalid");
    }

    if (!loginPassword.value.trim()) {
        messages.push("✖ Password is required");
    }

    if (messages.length > 0) {
        e.preventDefault();
        loginAlert.innerHTML = messages.join("<br>");
        loginAlert.classList.add("show");

        // Auto-hide after 5 seconds
        setTimeout(() => {
            loginAlert.classList.remove("show");
        }, 5000);
    }
});
