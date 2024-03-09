import load from "./utils/load.mjs";
import { API_KEY, API_BASE, API_POSTS } from "../../index.mjs";
import checkImage from "./utils/checkimage.mjs";

const profile = load("profile");

//console.log(profile);

export default async function getPosts() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //Legg inn bearer token dynamisk
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsIm5hbWUiOiJteV91c2VybmFtZSIsImVtYWlsIjoiZmlyc3QubGFzdEBzdHVkLm5vcm9mZi5ubyIsImJpbyI6bnVsbCwiY3JlYXRlZCI6IjIwMjQtMDItMDdUMTI6NDg6MjguMjQ3WiIsInVwZGF0ZWQiOiIyMDI0LTAyLTA3VDEyOjQ4OjI4LjI0N1oiLCJjcmVkaXRzIjoxMDAwLCJ2ZW51ZU1hbmFnZXIiOmZhbHNlLCJhdmF0YXIiOnsiaWQiOiJmMzQyOTIxZC1hM2M0LTQ1MGMtYTY1NC0xNTIwMjQwNTcwNGEiLCJ1cmwiOiJodHRwczovL3BpY3N1bS5waG90b3MvaWQvMTM1LzgwMC84MDAiLCJhbHQiOiIiLCJzb2NpYWxQb3N0SWQiOm51bGwsImF1Y3Rpb25MaXN0aW5nSWQiOm51bGwsImhvbGlkYXplVmVudWVJZCI6bnVsbCwidXNlckF2YXRhcklkIjo0MiwidXNlckJhbm5lcklkIjpudWxsLCJib29rSWQiOm51bGwsIm9sZEdhbWVJZCI6bnVsbCwib25saW5lU2hvcFByb2R1Y3RJZCI6bnVsbCwicmFpbnlEYXlzUHJvZHVjdElkIjpudWxsLCJnYW1lSHViUHJvZHVjdElkIjpudWxsLCJzcXVhcmVFeWVzUHJvZHVjdElkIjpudWxsfSwiYmFubmVyIjp7ImlkIjoiYTZiYzg2NzctMWE2Ni00Zjg5LWE5ZTctMDM4ZjViZmMyMWRkIiwidXJsIjoiaHR0cHM6Ly9waWNzdW0ucGhvdG9zL2lkLzg4OC8xNTAwLzUwMCIsImFsdCI6IiIsInNvY2lhbFBvc3RJZCI6bnVsbCwiYXVjdGlvbkxpc3RpbmdJZCI6bnVsbCwiaG9saWRhemVWZW51ZUlkIjpudWxsLCJ1c2VyQXZhdGFySWQiOm51bGwsInVzZXJCYW5uZXJJZCI6NDIsImJvb2tJZCI6bnVsbCwib2xkR2FtZUlkIjpudWxsLCJvbmxpbmVTaG9wUHJvZHVjdElkIjpudWxsLCJyYWlueURheXNQcm9kdWN0SWQiOm51bGwsImdhbWVIdWJQcm9kdWN0SWQiOm51bGwsInNxdWFyZUV5ZXNQcm9kdWN0SWQiOm51bGx9LCJpYXQiOjE3MDgzNjQ0MDl9.T5CJTFAArddnsJE4Kz_7Jb3b2gZKu4Pfn4WTFgwYBb0`,
      "X-Noroff-API-Key": API_KEY,
    },
  };
  const response = await fetch(API_BASE + API_POSTS + "?_author=true", options);
  const result = await response.json();
  //console.log(result);
  printPosts(result.data);
}

getPosts();

function printPosts(posts) {
  posts.forEach((post) => {
    console.log(post);
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

    const postContainer = document.getElementById("posts-container");

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

// .. inni forEach > create elements
// append elements til postCard
// append til DOM

const avatarFeed = document.getElementById("avatar-feed");
const avatarSidenav = document.getElementById("avatar-sidenav");
const username = document.getElementById("username");

avatarFeed.src = profile.avatar.url;
avatarSidenav.src = profile.avatar.url;
username.textContent = profile.name;

// Posts
