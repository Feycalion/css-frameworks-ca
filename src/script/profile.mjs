import load from "./utils/load.mjs";

const profile = load("profile");

console.log(profile);

const avatarSmall = document.getElementById("avatar-small");
const avatarBig = document.getElementById("avatar-big");
const username = document.getElementById("username");
const bio = document.getElementById("bio");

avatarSmall.src = profile.avatar.url;
avatarBig.src = profile.avatar.url;
username.textContent = profile.name;
bio.textContent = profile.bio;
