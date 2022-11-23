import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import VueAxios from 'vue-axios';
import axios from 'axios';

import './assets/main.css';

const app = createApp(App);
const axiosInstance = axios.create({
  baseURL: 'https://trilliumdev-staging.up.railway.app/',
});

app.use(createPinia());
app.use(router);

app.use(VueAxios, axiosInstance);

app.mount('#app');
