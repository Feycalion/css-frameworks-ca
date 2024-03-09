import load from "./utils/load.mjs";
import { API_KEY, API_BASE, API_POSTS } from "../../index.mjs";

const openModalButton = document.getElementById("open-modal-button");
const closeModalButton = document.getElementById("close-modal-button");
const modalContainer = document.getElementById("modal-container");
const createPostForm = document.getElementById("create-post-form");

openModalButton.addEventListener("click", () => {
  modalContainer.classList.remove("hidden");
});

closeModalButton.addEventListener("click", () => {
  modalContainer.classList.add("hidden");
});

createPostForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("post-title").value;
  const imageUrl = document.getElementById("image-url").value;
  const description = document.getElementById("description").value;
  const tags = document.getElementById("tags").value.split(",");

  const profile = load("profile");

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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(postData),
  };

  try {
    const response = await fetch(API_BASE + API_POSTS, options);
    const result = await response.json();

    if (response.ok) {
      console.log("Post created successfully:", result);
      // Optionally, you can close the modal or perform any other actions here
      modalContainer.classList.add("hidden");
    } else {
      console.error("Error creating post:", result);
      // Handle the error accordingly, e.g., display an error message
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
});
