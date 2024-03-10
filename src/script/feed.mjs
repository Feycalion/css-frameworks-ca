import load from "./utils/load.mjs";
import { API_KEY, API_BASE, API_POSTS } from "../../index.mjs";
import checkImage from "./utils/checkimage.mjs";

const profile = load("profile");

let postArray = [];

export default async function getPosts() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.accessToken} `,
      "X-Noroff-API-Key": API_KEY,
    },
  };
  const response = await fetch(API_BASE + API_POSTS + "?_author=true", options);
  const result = await response.json();
  postArray = result.data;

  printPosts(postArray);
}

getPosts();

const searchBar = document.getElementById("search-bar");
const postContainer = document.getElementById("posts-container");

searchBar.addEventListener("keyup", (e) => {
  const filteredResult = postArray.filter((post) =>
    post.title.includes(e.target.value)
  );
  postContainer.innerHTML = "";
  printPosts(filteredResult);
});

const sortMenu = document.getElementById("sort");

sortMenu.addEventListener("change", (e) => {
  console.log(e.target.value);

  let sortedResult = [];

  if (e.target.value === "a-z") {
    sortedResult = postArray
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));
  } else
    sortedResult = postArray
      .slice()
      .sort((a, b) => b.title.localeCompare(a.title));

  postContainer.innerHTML = "";
  printPosts(sortedResult);
});

function printPosts(posts) {
  posts.forEach((post) => {
    const postInfo = document.createElement("div");
    postInfo.classList.add("flex", "items-center", "mb-4");
    const postImage = checkImage(post.media);
    const postCard = document.createElement("a");
    postCard.href = `singlepost.html?id=${post.id}`;

    postCard.classList.add(
      "max-w-lg",
      "mx-auto",
      "my-8",
      "bg-white",
      "p-6",
      "rounded-md",
      "shadow-md",
      "block"
    );

    postInfo.innerHTML = `
    <img src="${post.author.avatar.url}" class="w-10 h-10 rounded-full mr-4 object-cover" />
    <p class="font-bold">${post.author.name}</p>
  `;

    postCard.innerHTML += `
    ${postInfo.outerHTML}
    <h2 class="text-xl font-bold mb-4">${post.title}</h2>
    <img src="${postImage.url}" alt="${postImage.alt}" class="flex items-center mb-4"/>
    <p class="mt-4 text-lg leading-relaxed">${post.body}</p>
    
    `;

    // postInteraction.innerHTML = ``;

    const tagsContainer = createTagsContainer(post.tags);
    postCard.appendChild(tagsContainer);

    postContainer.appendChild(postCard);
  });
}

// Tags

function createTagsContainer(tags) {
  const container = document.createElement("div");
  container.classList.add("flex", "items-center", "mb-4");

  if (Array.isArray(tags) && tags.length > 0 && tags[0] !== "") {
    tags.forEach((tag) => {
      const span = document.createElement("span");
      span.classList.add("text-xs", "text-gray-800", "mr-4", "mt-2");
      span.textContent = `#${tag}`;
      container.appendChild(span);
    });
  }

  return container;
}

const avatarFeed = document.getElementById("avatar-feed");
const avatarSidenav = document.getElementById("avatar-sidenav");
const username = document.getElementById("username");

avatarFeed.src = profile.avatar.url;
avatarSidenav.src = profile.avatar.url;
username.textContent = profile.name;

// Posts
