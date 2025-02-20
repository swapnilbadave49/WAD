document.addEventListener("DOMContentLoaded", function () {
    let username = localStorage.getItem("loggedInUser");

    if (!username) {
        window.location.href = "index.html";
    } else {
        document.getElementById("user").textContent = username;
    }
});

// Logout Function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}
