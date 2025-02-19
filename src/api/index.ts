import axios from "axios";

const api = axios.create({
  baseURL: "https://cataas.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
