window.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.getElementById("sign-up");

  if (signUpForm) {
    const inputs = signUpForm.querySelectorAll("input");
    const btn = signUpForm.querySelector('[type="submit"]');

    btn.disabled = true;

    inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        validateInput(e);
        toggleSubmitButton(signUpForm, btn);
      });
    });

    signUpForm.addEventListener("submit", (e) => validateForm(e));
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

function toggleSubmitButton(signUpForm, btn) {
  const inputs = signUpForm.querySelectorAll("input");
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

  // check if input with name="password", name="password_confirmation" are the same value
  let password = event.target.querySelector('input[name="password"]');
  let passowrdConfirm = event.target.querySelector(
    'input[name="password_confirmation"]'
  );

  const error = event.target.querySelector('.form-error');

  if (password.value !== passowrdConfirm.value) {
    error.innerHTML = "password and confirm password didn't match";
    error.classList.remove("invisible");
    return;

  } 

  const existingUsers = JSON.parse(localStorage.getItem('users'))??  [];
  const email = event.target.querySelector('input[name="email"]').value;

  //  user already have account
  if (existingUsers.some(user => user.email === email)) {
    error.innerHTML = "User already exists with this email";
    error.classList.remove("invisible");

    event.target.reset();
    event.target.querySelector('button[type="submit"]').disabled = true;
    return; 
  }

  //  store user
  const newUser = {
    firstname: event.target.querySelector('input[name="firstname"]').value,
    lastname: event.target.querySelector('input[name="lastname"]').value,
    email: email,
    password: password.value 
  };

  existingUsers.push(newUser);
  localStorage.setItem('users', JSON.stringify(existingUsers));

  // redirect to login
  redirectToLogin();
}


function redirectToLogin() {
  redircet('sign-in.html');
}

function isAuthenticated() {
  return localStorage.getItem("authID") !== null;
}

function redircet(uri) {
  window.location.href = uri;
}

if(isAuthenticated()) {
  redircet('index.html')
}