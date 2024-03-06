import load from "./utils/load.mjs";

const profile = load("profile");

console.log(profile);

const avatarFeed = document.getElementById("avatar-feed");
const avatarSidenav = document.getElementById("avatar-sidenav");
const username = document.getElementById("username");

avatarFeed.src = profile.avatar.url;
avatarSidenav.src = profile.avatar.url;
username.textContent = profile.name;
