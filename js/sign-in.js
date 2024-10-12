window.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.getElementById("sign-in");

  if (signInForm) {
    const inputs = signInForm.querySelectorAll("input");
    const btn = signInForm.querySelector('[type="submit"]');

    btn.disabled = true;

    inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        validateInput(e);
        toggleSubmitButton(signInForm, btn);
      });
    });

    signInForm.addEventListener("submit", (e) => validateForm(e));
  }
});

function validateInput(event) {
  const inputField = event.target;
  const errorMessage = inputField.nextElementSibling;

  if (inputField.value.trim() == "") {
    errorMessage.classList.remove("invisible");
  } else {
    errorMessage.classList.add("invisible");
  }
}

function toggleSubmitButton(signInForm, btn) {
  const inputs = signInForm.querySelectorAll("input");
  let isAnyInvalid = false;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      isAnyInvalid = true;
    }
  });

  btn.disabled = isAnyInvalid;
}

function validateForm(event) {
  event.preventDefault();
  const email = event.target.querySelector('input[name="email"]').value;
  const password = event.target.querySelector('input[name="password"]').value;
  const errorElement = event.target.querySelector(".form-error");

  errorElement.innerHTML = "";
  errorElement.classList.add("invisible");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem("authID", user.email); 
    redircet("index.html"); 
  } else {
    errorElement.innerHTML = "Invalid email or password.";
    errorElement.classList.remove("invisible");
  }
}

function isAuthenticated() {
  return localStorage.getItem("authID") !== null;
}

function redircet(uri) {
  window.location.href = uri;
}

if (isAuthenticated()) {
  redircet("index.html");
}
