<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const errorMsg = ref("");

const login = async () => {
  errorMsg.value = "";
  try {
    await auth.login(email.value, password.value);
  } catch (err) {
    errorMsg.value = auth.error || "Error al iniciar sesión";
  }
};
</script>

<template>
  <div class="container">
    <h1>Iniciar Sesión</h1>

    <form @submit.prevent="login">
      <div>
        <label>Email:</label>
        <input v-model="email" type="email" required />
      </div>

      <div>
        <label>Contraseña:</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit" :disabled="auth.loading">
        {{ auth.loading ? "Cargando..." : "Entrar" }}
      </button>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </form>

    <p>
      ¿No tienes cuenta?
      <router-link to="/register">Registrarse</router-link>
    </p>
  </div>
</template>

<style>
.container {
  max-width: 400px;
  margin: 40px auto;
}
.error {
  color: red;
}
</style>
