document.addEventListener("DOMContentLoaded", function () {
    const signInTab = document.getElementById("signInTab");
    const signUpTab = document.getElementById("signUpTab");
    const signInForm = document.getElementById("signInForm");
    const signUpForm = document.getElementById("signUpForm");

    // Switch between sign-in and sign-up forms
    signInTab.addEventListener("click", function () {
        signInForm.classList.remove("hidden");
        signUpForm.classList.add("hidden");
        signInTab.classList.add("border-blue-500");
        signUpTab.classList.remove("border-blue-500");
    });

    signUpTab.addEventListener("click", function () {
        signUpForm.classList.remove("hidden");
        signInForm.classList.add("hidden");
        signUpTab.classList.add("border-blue-500");
        signInTab.classList.remove("border-blue-500");
    });

    // Toggle password visibility
    document.querySelectorAll(".togglePassword").forEach(toggle => {
        toggle.addEventListener("click", function () {
            let passwordField = this.previousElementSibling;
            if (passwordField.type === "password") {
                passwordField.type = "text";
                this.textContent = "🙈"; 
            } else {
                passwordField.type = "password";
                this.textContent = "👁️"; 
            }
        });
    });


    signUpForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let username = document.getElementById("signUpUsername").value;
        let password = document.getElementById("signUpPassword").value;
        let signUpError = document.getElementById("signUpError");

        if (username === "" || password === "") {
            signUpError.textContent = "Fields cannot be empty!";
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        
        if (users.some(user => user.username === username)) {
            signUpError.textContent = "Username already exists!";
            signUpError.style.color = "red";
            return;
        }

        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        signUpError.textContent = "Registration Successful! Please Sign In.";
        signUpError.style.color = "green";

        setTimeout(() => signInTab.click(), 1000); 
    });

    signInForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let username = document.getElementById("signInUsername").value;
        let password = document.getElementById("signInPassword").value;
        let signInError = document.getElementById("signInError");

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            signInError.textContent = "Invalid Username or Password!";
            signInError.style.color = "red";
            return;
        }

        localStorage.setItem("loggedInUser", username);
        window.location.href = "welcome.html"; 
    });
});
