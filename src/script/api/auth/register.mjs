import {
  API_KEY,
  API_BASE,
  API_AUTH,
  API_REGISTER,
} from "../../../../index.mjs";

const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  window.location.href = "./profile";
});

export default async function register(username, email, password) {
  console.log(username, password, email);
  try {
    const response = await fetch(API_BASE + API_AUTH + API_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
  } catch (error) {
    console.error("Error during registration", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const formTitle = document.getElementById("form-title");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
  });

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#username").value;
    const email = document.querySelector("#create-email").value;
    const password = document.querySelector("#create-password").value;

    register(name, email, password);
  });

  // Toggle between login and registration forms
  document
    .getElementById("show-register-form")
    .addEventListener("click", function () {
      loginForm.style.display = "none";
      registerForm.style.display = "block";
      formTitle.innerHTML = `Register to <span class="ml-1 text-rose-500"> Picto</span><span class="text-violet-500">Chat</span>`;
    });

  document
    .getElementById("show-login-form")
    .addEventListener("click", function () {
      registerForm.style.display = "none";
      loginForm.style.display = "block";
      formTitle.innerHTML = `Log in to <span class="ml-1 text-rose-500"> Picto</span><span class="text-violet-500">Chat</span>`;
    });
});
