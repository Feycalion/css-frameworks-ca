import load from "./utils/load.mjs";
import { API_KEY, API_BASE, API_POSTS } from "../../index.mjs";

const openModalButton = document.getElementById("open-modal-button");
const closeModalButton = document.getElementById("close-modal-button");
const modalContainer = document.getElementById("modal-container");
const createPostForm = document.getElementById("create-post-form");

/**
 * Open the modal by removing the 'hidden' class.
 */

openModalButton.addEventListener("click", () => {
  modalContainer.classList.remove("hidden");
});

/**
 * Close the modal by adding the 'hidden' class.
 */

closeModalButton.addEventListener("click", () => {
  modalContainer.classList.add("hidden");
});

/**
 * Event listener for the submission of the create post form.
 * @param {Event} e - The form submission event.
 */
createPostForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Retrieve values from the form inputs
  const title = document.getElementById("post-title").value;
  const imageUrl = document.getElementById("image-url").value;
  const description = document.getElementById("description").value;
  const tags = document.getElementById("tags").value.split(",");

  // Load user profile from local storage
  const profile = load("profile");

  // Create post data object
  const postData = {
    title,
    body: description,
    tags,
    media: {
      url: imageUrl,
      alt: "",
    },
  };

  // Define options for the POST request
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
    // Make the POST request to create a new post
    const response = await fetch(API_BASE + API_POSTS, options);
    const result = await response.json();

    // Check if the request was successful
    if (response.ok) {
      console.log("Post created successfully:", result);

      // Hide the modal after successful post creation
      modalContainer.classList.add("hidden");
    } else {
      console.error("Error creating post:", result);
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
});
