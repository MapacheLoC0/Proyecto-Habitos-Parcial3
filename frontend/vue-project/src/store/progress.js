// frontend/vue-project/src/store/progress.js
import { defineStore } from "pinia";
import { api } from "../services/api";

export const useProgressStore = defineStore("progress", {
  state: () => ({
    progress: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProgress() {
      this.loading = true;
      this.error = null;

      try {
        const res = await api.get("/progress");
        this.progress = res.data;
      } catch (err) {
        this.error =
          err.response?.data?.error ||
          err.message ||
          "No se pudo cargar el progreso";
      } finally {
        this.loading = false;
      }
    },
  },
});
