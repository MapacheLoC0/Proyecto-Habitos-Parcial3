// src/services/habitsService.js
import { api } from "./api";

export const habitsService = {
  list() {
    return api.get("/habits");
  },

  get(id) {
    return api.get(`/habits/${id}`);
  },

  create(data) {
    return api.post("/habits", data);
  },

  update(id, data) {
    return api.put(`/habits/${id}`, data);
  },

  delete(id) {
    return api.delete(`/habits/${id}`);
  },

  progress(id, data) {
    return api.post(`/habits/${id}/progress`, data);
  },
};
