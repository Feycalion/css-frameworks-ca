import { API_KEY, API_BASE, API_AUTH, API_LOGIN } from "../../../../index.mjs";

/**
 * Login function that makes a POST request to authenticate a user.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<void>} - A Promise that resolves once the login process is completed.
 */
export default async function login(email, password) {
  console.log(password, email);
  try {
    const response = await fetch(API_BASE + API_AUTH + API_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    /**
     * Parsed JSON response from the authentication API.
     * @type {Object}
     * @property {Object} data - The user profile data.
     */
    const data = await response.json();
    console.log(data);

    // Save user profile data to localStorage
    localStorage.setItem("profile", JSON.stringify(data.data));

    // Redirect to the user's profile page
    window.location.href = "./profile";
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  /**
   * Event listener for the login form submission.
   *
   * @param {Event} e - The form submission event.
   */
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Retrieve email and password values from the form
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // Call the login function with the provided credentials
    login(email, password);
  });
});
