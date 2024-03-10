import {
  API_KEY,
  API_BASE,
  API_AUTH,
  API_REGISTER,
} from "../../../../index.mjs";

import login from "./login.mjs";

/**
 * User registration function that makes a POST request to register a new user.
 *
 * @param {string} username - The username for the new user.
 * @param {string} email - The email address for the new user.
 * @param {string} password - The password for the new user.
 * @param {string} avatarUrl - The URL of the user's avatar.
 * @returns {Promise<void>} - A Promise that resolves once the registration process is completed.
 */
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

    /**
     * Parsed JSON response from the registration API.
     * @type {Object}
     * @property {Object} data - The result data from the registration.
     */
    const result = await response.json();
    console.log(result);

    // After successful registration, automatically log in the user
    login(email, password);
  } catch (error) {
    console.error("Error during registration", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  /**
   * Event listener for the registration form submission.
   *
   * @param {Event} e - The form submission event.
   */
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const formTitle = document.getElementById("form-title");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Retrieve registration form input values
    const name = document.querySelector("#username").value;
    const email = document.querySelector("#create-email").value;
    const password = document.querySelector("#create-password").value;
    const avatarUrl = document.querySelector("#avatar-url").value;

    // Call the registration function with the provided data
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
