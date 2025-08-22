document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    const mobileToggle = document.getElementById("mobileToggle");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("mobileOverlay");
    const saveAllBtn = document.getElementById("saveAllBtn");
    const saveStatus = document.getElementById("saveStatus");

    /* --- Tab Switching --- */
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            let target = btn.dataset.tab + "-tab";
            tabContents.forEach(c => {
                c.classList.toggle("active", c.id === target);
            });
        });
    });

    /* --- Mobile Sidebar Toggle --- */
    mobileToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    });
    overlay.addEventListener("click", () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });

    /* --- Preferences Tags Toggle --- */
    document.querySelectorAll(".tag").forEach(tag => {
        tag.addEventListener("click", () => tag.classList.toggle("active"));
    });

    /* --- Save All Changes Simulation --- */
    saveAllBtn.addEventListener("click", () => {
        saveStatus.textContent = "Saving changes...";
        saveAllBtn.disabled = true;
        setTimeout(() => {
            saveStatus.textContent = "✅ All changes saved!";
            saveAllBtn.disabled = false;
        }, 1500);
    });

    /* --- Password Validation --- */
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const reqItems = document.querySelectorAll(".req-item");

    function validatePassword() {
        const val = newPassword.value;
        const rules = {
            length: val.length >= 8,
            uppercase: /[A-Z]/.test(val),
            lowercase: /[a-z]/.test(val),
            number: /[0-9]/.test(val),
            special: /[^A-Za-z0-9]/.test(val)
        };

        reqItems.forEach(item => {
            const rule = item.dataset.req;
            item.style.color = rules[rule] ? "green" : "red";
        });

        confirmPassword.style.borderColor =
            confirmPassword.value && confirmPassword.value !== val ? "red" : "";
    }

    newPassword.addEventListener("input", validatePassword);
    confirmPassword.addEventListener("input", validatePassword);
});
