<script setup>
import { onMounted } from 'vue';
import { useHabitStore } from '../store/habits';
import { useAuthStore } from '../store/auth';

const habits = useHabitStore();
const auth = useAuthStore();

onMounted(() => {
  habits.fetchHabits().catch(() => {});
});
</script>

<template>
  <div>
    <div class="card">
      <h2>Hola usuario</h2>
      <p>Revisa tus hábitos y tu progreso.</p>
      <button class="btn" @click="$router.push('/habits')">Ver Hábitos</button>
    </div>

    <div class="card" style="margin-top:18px;">
      <h3>Resumen</h3>
      <p>Total hábitos: {{ habits.habits.length }}</p>
      <button class="btn ghost" @click="$router.push('/progress')">
        Ver progreso
      </button>
    </div>
  </div>
</template>
