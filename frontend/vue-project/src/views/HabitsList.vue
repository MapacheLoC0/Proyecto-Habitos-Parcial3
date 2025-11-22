<script setup>
import { onMounted, ref } from 'vue';
import { useHabitStore } from '../store/habits';
import { useRouter } from 'vue-router';

const router = useRouter();
const habits = useHabitStore();
const loading = ref(false);
const error = ref('');

onMounted(async () => {
  try {
    loading.value = true;
    await habits.fetchHabits();
  } catch (err) {
    error.value = habits.error || 'Error al cargar hábitos';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <div class="card">
      <h2>Mis Hábitos</h2>
      <button class="btn" @click="router.push('/habit/new')">Nuevo Hábito</button>
    </div>

    <p v-if="error" style="color:crimson">{{ error }}</p>
    <p v-if="loading">Cargando...</p>

    <div v-for="h in habits.habits" :key="h.id || h._id" class="card" style="margin-top:16px;">
      <h3>{{ h.name || h.title || h.title }}</h3>
      <p>{{ h.description || '' }}</p>

      <button class="btn ghost" @click="router.push('/habit/' + (h.id || h._id))">Editar</button>
      <button class="btn" style="background:var(--secondary);margin-left:8px" @click="habits.markProgress(h.id || h._id)">Marcar Progreso</button>
      <button class="btn" style="margin-left:8px" @click="habits.deleteHabit(h.id || h._id)">Eliminar</button>
    </div>
  </div>
</template>
