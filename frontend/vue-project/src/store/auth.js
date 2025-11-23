// frontend/vue-project/src/store/auth.js
import { defineStore } from "pinia";
import { authService } from "../services/authService";
import router from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
  }),

  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;

      try {
        const res = await authService.login({ email, password });

        if (!res.data.token) {
          throw new Error("El backend no devolvió token");
        }

        this.token = res.data.token;
        this.isAuthenticated = true;
        this.user = res.data.user || null;

        localStorage.setItem("token", res.data.token);

        router.push("/dashboard");
      } catch (err) {
        this.error =
          err.response?.data?.error ||
          err.message ||
          "Error al iniciar sesión";

        throw err;
      } finally {
        this.loading = false;
      }
    },

    async register(data) {
      this.loading = true;
      this.error = null;

      try {
        await authService.register(data);
        router.push("/login");
      } catch (err) {
        this.error =
          err.response?.data?.error ||
          err.message ||
          "Error al registrarse";

        throw err;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("token");

      router.push("/login");
    },

    // Método para actualizar el estado de autenticación
    setAuthenticated(value) {
      this.isAuthenticated = value;
    },
  },
});