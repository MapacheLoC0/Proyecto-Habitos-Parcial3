<script setup>
import { onMounted, ref } from 'vue';
import { useHabitStore } from '../store/habits';
import { useRouter } from 'vue-router';

const router = useRouter();
const habitStore = useHabitStore();
const loading = ref(false);
const error = ref('');

onMounted(async () => {
  try {
    loading.value = true;
    await habitStore.fetchHabits();
  } catch (err) {
    error.value = habitStore.error || 'Error al cargar hábitos';
  } finally {
    loading.value = false;
  }
});

async function handleDeleteHabit(id) {
  if (!confirm('¿Estás seguro de eliminar este hábito?')) return;
  
  try {
    await habitStore.deleteHabit(id);
  } catch (err) {
    error.value = 'Error al eliminar el hábito';
  }
}

async function handleMarkProgress(id) {
  try {
    await habitStore.markProgress(id);
  } catch (err) {
    error.value = 'Error al marcar progreso';
  }
}
</script>

<template>
  <div class="habits-page">
    <div class="card header-card">
      <div class="header-content">
        <div>
          <h2>✨ Mis Hábitos</h2>
          <p class="subtitle">Gestiona tus hábitos diarios y alcanza tus metas</p>
        </div>
        <button class="btn btn-primary" @click="router.push('/habit/new')">
          ➕ Nuevo Hábito
        </button>
      </div>
    </div>

    <div v-if="error" class="alert alert-error">
      ⚠️ {{ error }}
    </div>

    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Cargando hábitos...</p>
    </div>

    <div v-else-if="habitStore.habits.length === 0" class="empty-state">
      <div class="empty-icon">📝</div>
      <h3>No tienes hábitos aún</h3>
      <p>Comienza creando tu primer hábito para mejorar tu día a día</p>
      <button class="btn btn-primary" @click="router.push('/habit/new')">
        Crear mi primer hábito
      </button>
    </div>

    <div v-else class="habits-grid">
      <div 
        v-for="h in habitStore.habits" 
        :key="h.id || h._id" 
        class="habit-card"
      >
        <div class="habit-header">
          <h3 class="habit-name">{{ h.name || h.title }}</h3>
          <span class="habit-icon">🎯</span>
        </div>
        
        <p v-if="h.description" class="habit-description">
          {{ h.description }}
        </p>

        <div class="habit-actions">
          <button 
            class="btn btn-small btn-ghost" 
            @click="router.push('/habit/' + (h.id || h._id))"
          >
            ✏️ Editar
          </button>
          <button 
            class="btn btn-small btn-success" 
            @click="handleMarkProgress(h.id || h._id)"
          >
            ✅ Completar
          </button>
          <button 
            class="btn btn-small btn-danger" 
            @click="handleDeleteHabit(h.id || h._id)"
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.habits-page {
  max-width: 1200px;
  margin: 0 auto;
}

.header-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.header-content h2 {
  color: white;
  margin-bottom: 8px;
  font-size: 2rem;
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin: 0;
}

.btn-primary {
  background: white;
  color: #667eea;
  font-weight: 700;
  padding: 12px 24px;
}

.btn-primary:hover {
  background: #f9fafb;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.alert {
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  font-weight: 600;
}

.alert-error {
  background: #fee2e2;
  color: #991b1b;
  border-left: 4px solid #dc2626;
}

.loading-container {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.empty-state h3 {
  color: #1f2937;
  font-size: 1.8rem;
  margin-bottom: 12px;
}

.empty-state p {
  color: #6b7280;
  font-size: 1.1rem;
  margin-bottom: 32px;
}

.habits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.habit-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.habit-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.habit-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 16px;
}

.habit-name {
  font-size: 1.4rem;
  color: #1f2937;
  margin: 0;
  flex: 1;
}

.habit-icon {
  font-size: 2rem;
  filter: grayscale(0.3);
}

.habit-description {
  color: #6b7280;
  margin-bottom: 20px;
  font-size: 0.95rem;
  line-height: 1.6;
}

.habit-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-small {
  padding: 8px 16px;
  font-size: 0.875rem;
  flex: 1;
  min-width: fit-content;
}

.btn-ghost {
  background: #f3f4f6;
  color: #4b5563;
  border: none;
}

.btn-ghost:hover {
  background: #e5e7eb;
  color: #1f2937;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover {
  background: #059669;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .habits-grid {
    grid-template-columns: 1fr;
  }

  .habit-actions {
    flex-direction: column;
  }

  .btn-small {
    width: 100%;
  }
}
</style>