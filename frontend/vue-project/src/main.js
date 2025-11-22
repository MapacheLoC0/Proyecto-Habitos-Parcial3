// /src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate());

app.use(pinia);


const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
