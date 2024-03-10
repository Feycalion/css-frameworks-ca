import load from "./utils/load.mjs";
import {
  API_KEY,
  API_BASE,
  API_POSTS,
  API_POST,
  API_PROFILE,
} from "../../index.mjs";
import checkImage from "./utils/checkimage.mjs";

const profile = load("profile");

console.log(profile);

const avatarSmall = document.getElementById("avatar-small");
const avatarBig = document.getElementById("avatar-big");
const username = document.getElementById("username");
const bio = document.getElementById("bio");

avatarSmall.src = profile.avatar.url;
avatarBig.src = profile.avatar.url;
username.textContent = profile.name;

if (profile.bio && profile.bio.trim() !== "") {
  bio.textContent = profile.bio;
} else {
  bio.textContent = "This user hasn't added a bio yet.";
}

/**
 * Get posts created by the user.
 * @returns {Promise<Array>} - A Promise that resolves with an array of user's posts.
 */

async function getUserPosts() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };
  const response = await fetch(
    `${API_BASE}${API_PROFILE}/${profile.name}${API_POST}`,
    options
  );
  const result = await response.json();

  return result.data;
}

/**
 * Display user's posts in the DOM.
 * @returns {Promise<void>} - A Promise that resolves once the posts are displayed.
 */

async function displayUserPosts() {
  const userPosts = await getUserPosts();
  const postsContainer = document.getElementById("posts-container");
  const gridContainer = document.getElementById("grid-container");
  postsContainer.innerHTML = "";
  gridContainer.innerHTML = "";

  userPosts.forEach((post) => {
    const postCard = createPostCard(post);
    postsContainer.appendChild(gridContainer);
    gridContainer.appendChild(postCard);
  });
}

/**
 * Create a DOM element representing a post card.
 * @param {Object} post - The post object.
 * @returns {HTMLDivElement} - The created post card element.
 */

function createPostCard(post) {
  console.log(post);
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
  postCard.innerHTML = `
  <div class="flex justify between items-center">
 
    <h2 class="text-xl font-bold mb-4">${post.title}</h2>
    <svg class="edit-btn w-6 h-6" data-post-id=${
      post.id
    } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
</div>

    <img src="${checkImage(post.media).url}" alt="${
    checkImage(post.media).alt
  }" class="flex items-center mb-4" />
    <p class="mt-4 text-lg leading-relaxed">${post.body}</p>
    <p class="text-xs text-gray-800 mr-4 mt-2"> ${
      post.tags ? post.tags.map((tag) => `#${tag}`).join(", ") : ""
    }</p>
    
  `;
  return postCard;
}

displayUserPosts();

const closeModalButton = document.getElementById("close-modal-button");
const modalContainer = document.getElementById("modal-container");
const updatePostForm = document.getElementById("update-post-form");
const deleteButton = document.getElementById("delete-btn");

closeModalButton.addEventListener("click", () => {
  modalContainer.classList.add("hidden");
});

document.addEventListener("click", (e) => {
  const editButton = e.target.classList.contains("edit-btn")
    ? e.target
    : e.target.closest(".edit-btn");

  if (editButton) {
    deleteButton.addEventListener("click", async (e) => {
      console.log(e);
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${profile.accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
      };

      try {
        const response = await fetch(
          `${API_BASE}${API_POSTS}/${postId}`,
          options
        );
        const result = await response.json();

        displayUserPosts();

        if (response.ok) {
          console.log("Post updated successfully:", result);

          modalContainer.classList.add("hidden");
        } else {
          console.error("Error updating post:", result);
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    });

    const postId = editButton.dataset.postId;
    console.log(postId);
    modalContainer.classList.remove("hidden");
    updatePostForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = document.getElementById("post-title").value;
      const imageUrl = document.getElementById("image-url").value;
      const description = document.getElementById("description").value;
      const tags = document.getElementById("tags").value.split(",");

      const postData = {
        title,
        body: description,
        tags,
        media: {
          url: imageUrl,
          alt: "",
        },
      };
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${profile.accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(postData),
      };

      try {
        const response = await fetch(
          `${API_BASE}${API_POSTS}/${postId}`,
          options
        );
        const result = await response.json();

        if (response.ok) {
          console.log("Post updated successfully:", result);

          displayUserPosts();

          modalContainer.classList.add("hidden");
        } else {
          console.error("Error updating post:", result);
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    });
  }
});
