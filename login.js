function login(e) {
  e.preventDefault();

  let email = document.getElementById("email").value.trim().toLowerCase();

  let allowedEmails = ["test@gmail.com", "admin@gmail.com", "yara@gmail.com"];

  if (allowedEmails.includes(email)) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    window.location.href = "home.html";
  } else {
    alert("Access denied ❌");
  }
}

// لو already logged in
if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.href = "home.html";
}
