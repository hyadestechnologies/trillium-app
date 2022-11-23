import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import axios from './plugins/axios';
import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(axios, {
  baseUrl: 'http://192.168.1.250:8000',
});

app.mount('#app');
