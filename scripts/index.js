const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phone');
const password = document.getElementById('password');
const passConfirmation = document.getElementById('confirmPassword');
const form = document.getElementById('signup-form');
const formAlert = document.getElementById('form-alert');

form.addEventListener('submit', (e) => {
    let messages = [];

    if (!firstName.value.trim()) messages.push("✖ First Name is required");
    if (!lastName.value.trim()) messages.push("✖ Last Name is required");
    if (!email.value.trim()) {
        messages.push("✖ Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        messages.push("✖ Email is invalid");
    }
    if (!phoneNumber.value.trim()) {
        messages.push("✖ Phone Number is required");
    } else if (!/^\d{8,15}$/.test(phoneNumber.value)) {
        messages.push("✖ Phone Number is invalid");
    }
    if (!password.value) {
        messages.push("✖ Password is required");
    } else if (password.value.length < 6) {
        messages.push("✖ Password must be at least 6 characters");
    }
    if (password.value !== passConfirmation.value) {
        messages.push("✖ Passwords do not match");
    }

    if (messages.length > 0) {
        e.preventDefault();
        formAlert.innerHTML = messages.join("<br>");
        formAlert.classList.add("show");

        // Optional: hide after 5 seconds
        setTimeout(() => {
            formAlert.classList.remove("show");
        }, 5000);
    }
});
