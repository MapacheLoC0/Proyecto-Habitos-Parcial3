<script setup>
import { onMounted } from 'vue';
import { useHabitStore } from '../store/habits';

const habits = useHabitStore();

onMounted(() => {
  habits.fetchHabits().catch(()=>{});
});
</script>

<template>
  <div>
    <div class="card">
      <h2>Progreso de Hábitos</h2>
      <p>Ves el conteo de progreso por hábito.</p>
    </div>

    <div v-for="h in habits.habits" :key="h.id || h._id" class="card" style="margin-top:12px;">
      <h3>{{ h.name || h.title }}</h3>
      <p>Días completados: {{ (h.progress && h.progress.length) || 0 }}</p>
    </div>
  </div>
</template>
