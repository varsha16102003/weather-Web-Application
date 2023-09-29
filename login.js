document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username === "Username" && password === "Password") {
        window.location.href = "home.html"; 
    } else {
        document.getElementById("error").textContent = "Invalid username or password.";
    }
});