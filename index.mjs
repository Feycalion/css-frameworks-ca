export const API_KEY = "536d554a-819f-47c9-8d72-9fe4f8014a8b";

export const API_BASE = "https://v2.api.noroff.dev";
export const API_AUTH = "/auth";
export const API_REGISTER = "/register";
export const API_LOGIN = "/login";
export const API_KEY_URL = "/create-api-key";
export const API_POSTS = "/social/posts";
export const API_SINGLE_POST = "/social/posts/<id>";

export default async function getPosts(data) {
  console.log(data);
  console.log("hei");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsIm5hbWUiOiJteV91c2VybmFtZSIsImVtYWlsIjoiZmlyc3QubGFzdEBzdHVkLm5vcm9mZi5ubyIsImJpbyI6bnVsbCwiY3JlYXRlZCI6IjIwMjQtMDItMDdUMTI6NDg6MjguMjQ3WiIsInVwZGF0ZWQiOiIyMDI0LTAyLTA3VDEyOjQ4OjI4LjI0N1oiLCJjcmVkaXRzIjoxMDAwLCJ2ZW51ZU1hbmFnZXIiOmZhbHNlLCJhdmF0YXIiOnsiaWQiOiJmMzQyOTIxZC1hM2M0LTQ1MGMtYTY1NC0xNTIwMjQwNTcwNGEiLCJ1cmwiOiJodHRwczovL3BpY3N1bS5waG90b3MvaWQvMTM1LzgwMC84MDAiLCJhbHQiOiIiLCJzb2NpYWxQb3N0SWQiOm51bGwsImF1Y3Rpb25MaXN0aW5nSWQiOm51bGwsImhvbGlkYXplVmVudWVJZCI6bnVsbCwidXNlckF2YXRhcklkIjo0MiwidXNlckJhbm5lcklkIjpudWxsLCJib29rSWQiOm51bGwsIm9sZEdhbWVJZCI6bnVsbCwib25saW5lU2hvcFByb2R1Y3RJZCI6bnVsbCwicmFpbnlEYXlzUHJvZHVjdElkIjpudWxsLCJnYW1lSHViUHJvZHVjdElkIjpudWxsLCJzcXVhcmVFeWVzUHJvZHVjdElkIjpudWxsfSwiYmFubmVyIjp7ImlkIjoiYTZiYzg2NzctMWE2Ni00Zjg5LWE5ZTctMDM4ZjViZmMyMWRkIiwidXJsIjoiaHR0cHM6Ly9waWNzdW0ucGhvdG9zL2lkLzg4OC8xNTAwLzUwMCIsImFsdCI6IiIsInNvY2lhbFBvc3RJZCI6bnVsbCwiYXVjdGlvbkxpc3RpbmdJZCI6bnVsbCwiaG9saWRhemVWZW51ZUlkIjpudWxsLCJ1c2VyQXZhdGFySWQiOm51bGwsInVzZXJCYW5uZXJJZCI6NDIsImJvb2tJZCI6bnVsbCwib2xkR2FtZUlkIjpudWxsLCJvbmxpbmVTaG9wUHJvZHVjdElkIjpudWxsLCJyYWlueURheXNQcm9kdWN0SWQiOm51bGwsImdhbWVIdWJQcm9kdWN0SWQiOm51bGwsInNxdWFyZUV5ZXNQcm9kdWN0SWQiOm51bGx9LCJpYXQiOjE3MDgzNjQ0MDl9.T5CJTFAArddnsJE4Kz_7Jb3b2gZKu4Pfn4WTFgwYBb0`,
      "X-Noroff-API-Key": API_KEY,
    },
  };
  const response = await fetch(API_BASE + API_POSTS, options);
  const result = await response.json();
  console.log(result);
}

getPosts("jhi");

import register from "./src/script/api/auth/register.mjs";
