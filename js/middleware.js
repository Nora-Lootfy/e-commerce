function isAuthenticated() {
  return localStorage.getItem("authID") !== null;
}

function redirectToLogin() {
  window.location.href = "sign-in.html";
}


if (!isAuthenticated()) {
  redirectToLogin();
}
