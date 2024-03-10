import load from "./utils/load.mjs";
import { API_KEY, API_BASE, API_POSTS } from "../../index.mjs";
import checkImage from "./utils/checkimage.mjs";

const profile = load("profile");

async function getSinglePost(postId) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.accessToken} `,
      "X-Noroff-API-Key": API_KEY,
    },
  };
  const response = await fetch(
    `${API_BASE}${API_POSTS}/${postId}?_author=true`,
    options
  );
  const post = await response.json();
  printPost(post.data);
  console.log(post.data);
}

function printPost(post) {
  const postInfo = document.createElement("div");
  postInfo.classList.add("flex", "items-center", "mb-4");
  const postImage = checkImage(post.media);
  const postCard = document.createElement("div");

  postCard.classList.add(
    "max-w-lg",
    "mx-auto",
    "my-8",
    "bg-white",
    "p-6",
    "rounded-md",
    "shadow-md"
  );

  postInfo.innerHTML = `
   <img src="${post.author?.avatar?.url}" class="w-10 h-10 rounded-full mr-4 object-cover" />
   <p class="font-bold">${post.author?.name}</p>
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

  const postContainer = document.getElementById("single-post-container");

  postContainer.appendChild(postCard);
}

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

(async () => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  await getSinglePost(id);
})();
