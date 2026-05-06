function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "test@gmail.com" && password === "123") {
    localStorage.setItem("token", "temp");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("error").innerText = "Invalid credentials";
  }
}
