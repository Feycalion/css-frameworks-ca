const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  window.location.href = "./profile";
});

console.log("hei");

import { API_KEY, API_BASE, API_AUTH, API_LOGIN } from "../../../../index.mjs";

console.log("hei");

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
    const data = await response.json();
    console.log(data.data.accessToken);
    localStorage.setItem("token", data.data.accessToken);
    console.log(localStorage.getItem("token"));
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    login(email, password);
  });
});
