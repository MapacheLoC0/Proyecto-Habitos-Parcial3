<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHabitStore } from '../store/habits';

const route = useRoute();
const router = useRouter();
const habits = useHabitStore();

const id = route.params.id;
const isNew = id === 'new';
const form = ref({ name: '', description: '' });
const loading = ref(false);
const error = ref('');

onMounted(() => {
  if (!isNew) {
    const h = habits.habits.find(x => (x.id === id || x._id === id));
    if (h) form.value = { name: h.name || h.title || '', description: h.description || '' };
  }
});

async function save() {
  error.value = '';
  loading.value = true;
  try {
    if (isNew) {
      await habits.createHabit({ name: form.value.name, description: form.value.description });
    } else {
      await habits.updateHabit(id, { name: form.value.name, description: form.value.description });
    }
    router.push('/habits');
  } catch (err) {
    error.value = habits.error || err.response?.data?.error || 'Error al guardar';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="card">
    <h2>{{ isNew ? 'Nuevo Hábito' : 'Editar Hábito' }}</h2>
    <p v-if="error" style="color:crimson">{{ error }}</p>

    <input class="input" v-model="form.name" placeholder="Nombre" />
    <br/><br/>
    <textarea class="input" rows="4" v-model="form.description" placeholder="Descripción"></textarea>
    <br/><br/>
    <button class="btn" @click="save" :disabled="loading">{{ loading ? 'Guardando...' : 'Guardar' }}</button>
  </div>
</template>
