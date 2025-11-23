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
  if (!form.value.name.trim()) {
    error.value = 'El nombre del hábito es requerido';
    return;
  }

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

function cancel() {
  router.push('/habits');
}
</script>

<template>
  <div class="form-page">
    <div class="card form-card">
      <div class="form-header">
        <button class="back-btn" @click="cancel">
          ← Volver
        </button>
        <h2 class="form-title">
          {{ isNew ? '✨ Nuevo Hábito' : '✏️ Editar Hábito' }}
        </h2>
      </div>

      <div v-if="error" class="alert alert-error">
        ⚠️ {{ error }}
      </div>

      <form @submit.prevent="save" class="habit-form">
        <div class="form-group">
          <label for="name" class="form-label">
            Nombre del hábito <span class="required">*</span>
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="form-input"
            placeholder="Ej: Hacer ejercicio, Leer 30 minutos, Meditar..."
            required
            maxlength="100"
          />
          <small class="form-hint">{{ form.name.length }}/100 caracteres</small>
        </div>

        <div class="form-group">
          <label for="description" class="form-label">
            Descripción (opcional)
          </label>
          <textarea
            id="description"
            v-model="form.description"
            class="form-input"
            rows="5"
            placeholder="Describe tu hábito y por qué es importante para ti..."
            maxlength="500"
          ></textarea>
          <small class="form-hint">{{ (form.description || '').length }}/500 caracteres</small>
        </div>

        <div class="form-actions">
          <button
            type="button"
            class="btn btn-ghost"
            @click="cancel"
            :disabled="loading"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="loading || !form.name.trim()"
          >
            <span v-if="loading">Guardando...</span>
            <span v-else>{{ isNew ? '✨ Crear Hábito' : '💾 Guardar Cambios' }}</span>
          </button>
        </div>
      </form>

      <div class="form-tips">
        <h3 class="tips-title">💡 Consejos para crear buenos hábitos:</h3>
        <ul class="tips-list">
          <li>Sé específico: "Correr 20 minutos" es mejor que "Hacer ejercicio"</li>
          <li>Empieza pequeño: Es mejor mantener un hábito simple que abandonar uno ambicioso</li>
          <li>Sé consistente: La repetición diaria es clave para formar hábitos duraderos</li>
          <li>Asocia con rutinas: Vincula el nuevo hábito con algo que ya haces</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-page {
  max-width: 700px;
  margin: 0 auto;
}

.form-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.form-header {
  margin-bottom: 32px;
}

.back-btn {
  background: none;
  border: none;
  color: #667eea;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 16px;
  transition: color 0.2s;
}

.back-btn:hover {
  color: #4338ca;
}

.form-title {
  font-size: 2rem;
  color: #1f2937;
  margin: 0;
}

.alert {
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.alert-error {
  background: #fee2e2;
  color: #991b1b;
  border-left: 4px solid #dc2626;
}

.habit-form {
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 28px;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  font-size: 1rem;
}

.required {
  color: #ef4444;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  color: #1f2937;
  transition: all 0.2s;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

textarea.form-input {
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
}

.form-hint {
  display: block;
  margin-top: 6px;
  color: #6b7280;
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 8px;
}

.btn {
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-ghost {
  background: transparent;
  color: #6b7280;
  border: 2px solid #e5e7eb;
}

.btn-ghost:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #d1d5db;
}

.form-tips {
  background: #f0f9ff;
  border-left: 4px solid #3b82f6;
  border-radius: 12px;
  padding: 24px;
}

.tips-title {
  font-size: 1.1rem;
  color: #1e40af;
  margin: 0 0 16px 0;
}

.tips-list {
  margin: 0;
  padding-left: 24px;
  color: #1e40af;
}

.tips-list li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.tips-list li:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .form-card {
    padding: 24px 20px;
  }

  .form-title {
    font-size: 1.5rem;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions .btn {
    width: 100%;
  }
}
</style>