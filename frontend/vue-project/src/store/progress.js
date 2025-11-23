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
        // CAMBIO: La ruta correcta es /habits/progress
        const res = await api.get("/habits/progress");
        this.progress = res.data;
      } catch (err) {
        this.error =
          err.response?.data?.error ||
          err.message ||
          "No se pudo cargar el progreso";
        console.error("Error fetching progress:", err);
      } finally {
        this.loading = false;
      }
    },
  },
});