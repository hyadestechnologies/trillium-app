<script setup lang="ts">
import { inject } from 'vue';
import { getAuthToken } from '@/shared/functions/request';
import { useQuery } from '@tanstack/vue-query';
import router from '@/router';

const axios: any = inject('axios');

const fetcher = async () => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getAuthToken();
  return axios
    .get(`/settings/current`)
    .then((response: any) => response.data)
    .catch((error: any) => Promise.reject(error));
};

const { isLoading, isError, data, error } = useQuery({
  queryKey: ['getSettings'],
  queryFn: fetcher,
});
</script>

<template>
  <div class="flex flex-col p-3">
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">{{ error }}</span>
    <div v-else>
      <div class="form-item">
        <h3>Language</h3>
        <span>{{ data.language }}</span>
      </div>
      <div class="form-item">
        <h3>Visibility</h3>
        <span>{{ data.visibility }}</span>
      </div>
    </div>

    <div class="flex mt-3 align-center justify-end">
      <button class="btn-default mx-2" @click="router.push({ path: '/profile/updateSettings/' })" v-if="!isLoading">
        Modify
      </button>
    </div>
  </div>
</template>

<style scoped>
.form-item {
  display: flex;
  align-items: flex-start;
  margin: 0.5rem;
  justify-content: space-between;
}
</style>
