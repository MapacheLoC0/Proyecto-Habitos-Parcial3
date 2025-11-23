<template>
  <div id="app">
    <header class="topbar">
      <div class="container">
        <h1 @click="$router.push('/dashboard')" style="cursor:pointer">Gestor de Hábitos</h1>
        <nav>
          <button v-if="auth.isAuthenticated" class="btn ghost" @click="$router.push('/habits')">Mis hábitos</button>
          <button v-if="auth.isAuthenticated" class="btn ghost" @click="$router.push('/progress')">Progreso</button>
          <button v-if="auth.isAuthenticated" class="btn outline" @click="logout">Salir</button>
          <router-link v-else to="/login" class="link">Entrar</router-link>
        </nav>
      </div>
    </header>

    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from './store/auth';
const auth = useAuthStore();

function logout() {
  auth.logout();
}
</script>

<style>
:root{
  --bg:#eef6f9;
  --card:#ffffff;
  --primary:#6aa3c8;
  --secondary:#8fc6a7;
  --text:#2f3b4c;
}
body{ margin:0; font-family: Inter, system-ui, Arial; background:var(--bg); color:var(--text); }
.container{ max-width:1000px; margin:24px auto; padding:0 18px; }
.topbar{ background:transparent; padding:12px 0; border-bottom:1px solid rgba(47,59,76,0.05); }
.topbar .container{ display:flex; align-items:center; justify-content:space-between; }
.card{ background:var(--card); padding:20px; border-radius:12px; box-shadow:0 6px 18px rgba(47,59,76,0.06); }
.input{ width:100%; padding:10px; border-radius:8px; border:1px solid #dbe6eb; }
.btn{ background:var(--primary); color:white; border:none; padding:8px 12px; border-radius:8px; cursor:pointer; }
.btn.ghost{ background:transparent; color:var(--text); border:1px solid rgba(47,59,76,0.06); }
.btn.outline{ background:var(--secondary); color:white; }
.link{ color:var(--primary); text-decoration:underline; }
</style>
