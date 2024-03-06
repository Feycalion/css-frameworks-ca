import {
  API_KEY,
  API_BASE,
  API_AUTH,
  API_REGISTER,
} from "../../../../index.mjs";

import login from "./login.mjs";

export default async function register(username, email, password, avatarUrl) {
  console.log(username, password, email, avatarUrl);
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
        avatar: {
          url: avatarUrl,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    login(email, password);
  } catch (error) {
    console.error("Error during registration", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const formTitle = document.getElementById("form-title");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#username").value;
    const email = document.querySelector("#create-email").value;
    const password = document.querySelector("#create-password").value;
    const avatarUrl = document.querySelector("#avatar-url").value;

    register(name, email, password, avatarUrl);
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
