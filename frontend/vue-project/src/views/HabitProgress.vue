<script setup>
import { useProgressStore } from "../store/progress";
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const progressStore = useProgressStore();
const router = useRouter();

onMounted(() => {
  progressStore.fetchProgress();
});

const totalDays = computed(() => {
  return progressStore.progress.reduce((sum, item) => sum + item.count, 0);
});

const averageDays = computed(() => {
  if (progressStore.progress.length === 0) return 0;
  return Math.round(totalDays.value / progressStore.progress.length);
});

const getProgressIcon = (count) => {
  if (count >= 90) return "🏆";
  if (count >= 30) return "🌟";
  if (count >= 7) return "🔥";
  return "✨";
};

const getProgressPercentage = (count) => {
  const maxDays = 30;
  return Math.min((count / maxDays) * 100, 100);
};
</script>

<template>
  <div class="progress-page">
    <div class="card header-card">
      <h2>📊 Progreso de Hábitos</h2>
      <p class="subtitle">Revisa tu avance y mantente motivado</p>
    </div>

    <div v-if="progressStore.loading" class="loading-container">
      <div class="spinner"></div>
      <p>Cargando progreso...</p>
    </div>

    <div v-else-if="progressStore.progress.length === 0" class="empty-state">
      <div class="empty-icon">📈</div>
      <h3>Sin progreso registrado</h3>
      <p>Comienza a marcar tus hábitos como completados para ver tu progreso aquí</p>
      <button class="btn btn-primary" @click="router.push('/habits')">
        Ver mis hábitos
      </button>
    </div>

    <div v-else class="progress-grid">
      <div
        v-for="item in progressStore.progress"
        :key="item.habitId"
        class="progress-card"
      >
        <div class="progress-header">
          <div class="progress-icon">
            {{ getProgressIcon(item.count) }}
          </div>
          <div class="progress-info">
            <h3 class="progress-title">{{ item.name }}</h3>
            <p class="progress-subtitle">Racha actual</p>
          </div>
        </div>
        
        <div class="progress-stats">
          <div class="stat-main">
            <span class="stat-number">{{ item.count }}</span>
            <span class="stat-label">{{ item.count === 1 ? 'día' : 'días' }}</span>
          </div>
          
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: getProgressPercentage(item.count) + '%' }"
            ></div>
          </div>

          <div class="achievement-badges">
            <span v-if="item.count >= 7" class="badge badge-bronze">🥉 1 semana</span>
            <span v-if="item.count >= 30" class="badge badge-silver">🥈 1 mes</span>
            <span v-if="item.count >= 90" class="badge badge-gold">🥇 3 meses</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="progressStore.progress.length > 0" class="summary-card card">
      <h3>📋 Resumen General</h3>
      <div class="summary-stats">
        <div class="summary-item">
          <span class="summary-number">{{ progressStore.progress.length }}</span>
          <span class="summary-label">Hábitos activos</span>
        </div>
        <div class="summary-item">
          <span class="summary-number">{{ totalDays }}</span>
          <span class="summary-label">Total días completados</span>
        </div>
        <div class="summary-item">
          <span class="summary-number">{{ averageDays }}</span>
          <span class="summary-label">Promedio por hábito</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProgressStore } from "../store/progress";
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const progressStore = useProgressStore();
    const router = useRouter();

    onMounted(() => {
      progressStore.fetchProgress();
    });

    const totalDays = computed(() => {
      return progressStore.progress.reduce((sum, item) => sum + item.count, 0);
    });

    const averageDays = computed(() => {
      if (progressStore.progress.length === 0) return 0;
      return Math.round(totalDays.value / progressStore.progress.length);
    });

    const getProgressIcon = (count) => {
      if (count >= 90) return "🏆";
      if (count >= 30) return "🌟";
      if (count >= 7) return "🔥";
      return "✨";
    };

    const getProgressPercentage = (count) => {
      const maxDays = 30;
      return Math.min((count / maxDays) * 100, 100);
    };

    return {
      progressStore,
      router,
      totalDays,
      averageDays,
      getProgressIcon,
      getProgressPercentage
    };
  },
};
</script>

<style scoped>
.progress-page {
  max-width: 1200px;
  margin: 0 auto;
}

.header-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-bottom: 32px;
}

.header-card h2 {
  color: white;
  font-size: 2rem;
  margin-bottom: 8px;
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin: 0;
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
}

.empty-state h3 {
  font-size: 1.8rem;
  margin-bottom: 12px;
}

.btn-primary {
  background: #667eea;
  color: white;
  padding: 12px 24px;
  margin-top: 20px;
}

.progress-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.progress-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-left: 4px solid #667eea;
}

.progress-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.15);
}

.progress-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.progress-icon {
  font-size: 3rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 12px;
}

.progress-info {
  flex: 1;
}

.progress-title {
  font-size: 1.3rem;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.progress-subtitle {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
}

.progress-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stat-main {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: #667eea;
}

.stat-label {
  font-size: 1.1rem;
  color: #6b7280;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 6px;
  transition: width 0.5s ease;
}

.achievement-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.badge-bronze {
  background: #fef3c7;
  color: #92400e;
}

.badge-silver {
  background: #e5e7eb;
  color: #374151;
}

.badge-gold {
  background: #fef3c7;
  color: #78350f;
}

.summary-card {
  background: white;
  padding: 32px;
}

.summary-card h3 {
  font-size: 1.5rem;
  margin-bottom: 24px;
  color: #1f2937;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
}

.summary-item {
  text-align: center;
  padding: 20px;
  background: #f9fafb;
  border-radius: 12px;
}

.summary-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 8px;
}

.summary-label {
  display: block;
  color: #6b7280;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .progress-grid {
    grid-template-columns: 1fr;
  }

  .summary-stats {
    grid-template-columns: 1fr;
  }
}
</style>