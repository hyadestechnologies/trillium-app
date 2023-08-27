import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import { VUE_QUERY_CLIENT, QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

import './assets/main.css';

const app = createApp(App);
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/v1/',
});

export const vueQueryPlugin = {
  install: (app: any, options: any) => {
    const queryClient = new QueryClient(options);
    app.provide(VUE_QUERY_CLIENT, queryClient);
  },
};

app.use(createPinia());
app.use(router);

app.use(VueAxios, axiosInstance);
app.provide('axios', app.config.globalProperties.axios);
app.use(VueQueryPlugin);
app.mount('#app');
