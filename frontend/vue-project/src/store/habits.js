// frontend/vue-project/src/store/habits.js
import { defineStore } from 'pinia';
import { api } from '../services/api';   // ← CORREGIDO

export const useHabitStore = defineStore('habits', {
  state: () => ({
    habits: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchHabits() {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.get('/habits');
        this.habits = res.data;
      } catch (err) {
        this.error = err.response?.data?.error || err.message || 'No se pudieron cargar hábitos';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async createHabit(payload) {
      try {
        const res = await api.post('/habits', payload);
        this.habits.unshift(res.data);
        return res.data;
      } catch (err) {
        this.error = err.response?.data?.error || err.message || 'Error al crear hábito';
        throw err;
      }
    },

    async updateHabit(id, payload) {
      try {
        const res = await api.put(`/habits/${id}`, payload);
        this.habits = this.habits.map(h => (h.id === id || h._id === id) ? res.data : h);
        return res.data;
      } catch (err) {
        this.error = err.response?.data?.error || err.message || 'Error al actualizar hábito';
        throw err;
      }
    },

    async deleteHabit(id) {
      try {
        await api.delete(`/habits/${id}`);
        this.habits = this.habits.filter(h => !(h.id === id || h._id === id));
      } catch (err) {
        this.error = err.response?.data?.error || err.message || 'Error al eliminar hábito';
        throw err;
      }
    },

    async markProgress(id) {
      try {
        await api.post(`/habits/${id}/progress`);
        await this.fetchHabits();
      } catch (err) {
        alert(err.response?.data?.error || err.message || 'Error al marcar progreso');
      }
    }
  }
});
