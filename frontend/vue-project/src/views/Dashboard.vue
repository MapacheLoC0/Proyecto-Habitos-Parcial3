<script setup>
import { onMounted, computed } from 'vue';
import { useHabitStore } from '../store/habits';

const habits = useHabitStore();

onMounted(() => {
  habits.fetchHabits().catch(() => {});
});

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return '¡Buenos días!';
  if (hour < 18) return '¡Buenas tardes!';
  return '¡Buenas noches!';
});

const motivationalQuote = computed(() => {
  const quotes = [
    'Los pequeños pasos diarios conducen a grandes cambios.',
    'La constancia es la clave del éxito.',
    'Cada día es una nueva oportunidad para mejorar.',
    'Tus hábitos definen tu futuro.',
    'El progreso, no la perfección, es el objetivo.'
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
});
</script>

<template>
  <div class="dashboard-page">
    <!-- Hero Section -->
    <div class="hero-card card">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">{{ greeting }} </h1>
          <p class="hero-subtitle">{{ motivationalQuote }}</p>
        </div>
        <div class="hero-actions">
          <button class="btn btn-primary" @click="$router.push('/habits')">
            ✨ Ver Hábitos
          </button>
          <button class="btn btn-outline" @click="$router.push('/progress')">
            📊 Ver Progreso
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📋</div>
        <div class="stat-content">
          <span class="stat-number">{{ habits.habits.length }}</span>
          <span class="stat-label">Hábitos Activos</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">🎯</div>
        <div class="stat-content">
          <span class="stat-number">{{ habits.habits.length }}</span>
          <span class="stat-label">Por Completar Hoy</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">🔥</div>
        <div class="stat-content">
          <span class="stat-number">0</span>
          <span class="stat-label">Racha Actual</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">⭐</div>
        <div class="stat-content">
          <span class="stat-number">{{ habits.habits.length * 7 }}</span>
          <span class="stat-label">Días Totales</span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card quick-actions-card">
      <h2 class="section-title">🚀 Acciones Rápidas</h2>
      <div class="actions-grid">
        <button class="action-btn" @click="$router.push('/habit/new')">
          <div class="action-icon">➕</div>
          <div class="action-text">
            <h3>Crear Hábito</h3>
            <p>Agrega un nuevo hábito a tu rutina</p>
          </div>
        </button>

        <button class="action-btn" @click="$router.push('/habits')">
          <div class="action-icon">✅</div>
          <div class="action-text">
            <h3>Marcar Progreso</h3>
            <p>Registra tu avance de hoy</p>
          </div>
        </button>

        <button class="action-btn" @click="$router.push('/progress')">
          <div class="action-icon">📈</div>
          <div class="action-text">
            <h3>Ver Estadísticas</h3>
            <p>Revisa tu progreso general</p>
          </div>
        </button>
      </div>
    </div>

    <!-- Recent Habits -->
    <div v-if="habits.habits.length > 0" class="card recent-habits-card">
      <div class="section-header">
        <h2 class="section-title">📌 Hábitos Recientes</h2>
        <button class="link-btn" @click="$router.push('/habits')">
          Ver todos →
        </button>
      </div>
      
      <div class="habits-list">
        <div 
          v-for="habit in habits.habits.slice(0, 3)" 
          :key="habit.id"
          class="habit-item"
        >
          <div class="habit-info">
            <span class="habit-emoji"></span>
            <div>
              <h4 class="habit-name">{{ habit.name }}</h4>
              <p class="habit-meta">Creado recientemente</p>
            </div>
          </div>
          <button 
            class="btn btn-small btn-success"
            @click="habits.markProgress(habit.id)"
          >
            Completar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-bottom: 32px;
  padding: 48px 32px;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 12px;
  color: white;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.hero-actions {
  display: flex;
  gap: 12px;
}

.btn-primary {
  background: white;
  color: #667eea;
  font-weight: 700;
}

.btn-primary:hover {
  background: #f9fafb;
}

.btn-outline {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 3rem;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.stat-label {
  font-size: 0.95rem;
  color: #6b7280;
  margin-top: 4px;
}

.section-title {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 24px;
}

.quick-actions-card {
  margin-bottom: 32px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.action-btn:hover {
  background: white;
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.1);
}

.action-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  flex-shrink: 0;
}

.action-text h3 {
  font-size: 1.1rem;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.action-text p {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.link-btn {
  background: none;
  border: none;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.2s;
}

.link-btn:hover {
  color: #4338ca;
}

.habits-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.habit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f9fafb;
  border-radius: 12px;
  transition: all 0.2s;
}

.habit-item:hover {
  background: #f3f4f6;
}

.habit-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.habit-emoji {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 10px;
}

.habit-name {
  font-size: 1.1rem;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.habit-meta {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.btn-small {
  padding: 8px 20px;
  font-size: 0.9rem;
}

.btn-success {
  background: #10b981;
}

.btn-success:hover {
  background: #059669;
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-actions {
    width: 100%;
    flex-direction: column;
  }

  .hero-actions .btn {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }

  .habit-item {
    flex-direction: column;
    gap: 16px;
  }

  .btn-small {
    width: 100%;
  }
}
</style>