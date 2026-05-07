function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  fetch('api/login.php', {
    method: 'POST',
    body: formData
  })
    .then((response) => response.text())
    .then((data) => {
      if (data.trim() === 'Login successful') {
        window.location.href = 'Dashboard.html';
      } else {
        document.getElementById('error').innerText = data;
      }
    });
}
