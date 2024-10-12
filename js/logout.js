function logout() {
  localStorage.removeItem("authID");

  window.location.href = "index.html";
}
