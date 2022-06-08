import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://api.github.com/",
  auth: {
    username: "7c0233407be931bbe13d",
    password: "6ad2677b8cb8acb4777a017e17e5aba78024a6e6",
  },
});
