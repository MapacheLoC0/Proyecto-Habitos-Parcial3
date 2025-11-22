<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";

const auth = useAuthStore();

const name = ref("");
const email = ref("");
const password = ref("");
const errorMsg = ref("");

const register = async () => {
  errorMsg.value = "";

  try {
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
    });
  } catch (err) {
    errorMsg.value = auth.error || "No se pudo registrar";
  }
};
</script>

<template>
  <div class="container">
    <h1>Registro</h1>

    <form @submit.prevent="register">
      <div>
        <label>Nombre:</label>
        <input v-model="name" type="text" required />
      </div>

      <div>
        <label>Email:</label>
        <input v-model="email" type="email" required />
      </div>

      <div>
        <label>Contraseña:</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit" :disabled="auth.loading">
        {{ auth.loading ? "Cargando..." : "Registrarse" }}
      </button>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </form>

    <p>
      ¿Ya tienes cuenta?
      <router-link to="/login">Iniciar sesión</router-link>
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
