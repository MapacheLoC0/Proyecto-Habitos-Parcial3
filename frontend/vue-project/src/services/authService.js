// src/services/authService.js
import { api } from "./api";

export const authService = {
  login(data) {
    return api.post("/auth/login", data);
  },

  register(data) {
    return api.post("/auth/register", data);
  },

  getProfile() {
    return api.get("/auth/profile"); // si lo implementaste
  },
};
