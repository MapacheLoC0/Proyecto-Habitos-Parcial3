<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Progreso de Hábitos</h2>

    <div v-if="loading">Cargando...</div>

    <div v-else>
      <div
        v-for="item in progress"
        :key="item.habitId"
        class="p-4 bg-white shadow rounded mb-3"
      >
        <h3 class="font-semibold text-lg">{{ item.name }}</h3>
        <p class="text-gray-500">Días completados: {{ item.count }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useProgressStore } from "../store/progress";
import { onMounted } from "vue";

export default {
  setup() {
    const progressStore = useProgressStore();

    onMounted(() => {
      progressStore.fetchProgress();
    });

    return {
      progress: progressStore.progress,
      loading: progressStore.loading,
    };
  },
};
</script>
