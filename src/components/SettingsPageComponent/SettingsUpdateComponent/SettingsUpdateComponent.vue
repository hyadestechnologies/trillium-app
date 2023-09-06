<script setup lang="ts">
import { computed, inject, reactive } from 'vue';
import { getAuthToken } from '@/shared/functions/request';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { Language, Visibility, type UserSettings } from '@/shared/types/user';
import router from '@/router';

const axios: any = inject('axios');

const settings: UserSettings = reactive({
  language: Language.IT,
  visibility: Visibility.HIDDEN,
});

const fetcher = async () => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getAuthToken();
  return axios
    .get(`/settings/current`)
    .then((response: any) => {
      (settings.language = response.data.language), (settings.visibility = response.data.visibility);
    })
    .catch((error: any) => Promise.reject(error));
};
const langFetcher = async () => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getAuthToken();
  return axios
    .put(`/settings/language/${settings.language}`)
    .then((response: any) => console.log(response))
    .catch((error: any) => Promise.reject(error));
};
const visibilityFetcher = async () => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getAuthToken();
  return axios
    .put(`/settings/visibility/${settings.visibility}`)
    .then((response: any) => router.push({ path: '/profile/settings' }))
    .catch((error: any) => Promise.reject(error));
};

const fetchSettingsQuery = useQuery({
  queryKey: ['getSettings'],
  queryFn: fetcher,
});
const updateLanguageMutation = useMutation({ mutationFn: langFetcher });
const updateVisibilityMutation = useMutation({ mutationFn: visibilityFetcher });

function updateSettings() {
  updateLanguageMutation.mutate();
  updateVisibilityMutation.mutate();
}
</script>

<template>
  <div class="flex flex-col p-3">
    <div class="form-item">
      <label for="language" class="pr-2">Language</label>
      <select id="language" class="w-[70%] px-1 text-black" v-model="settings.language">
        <option v-for="lang in Language" :key="lang" :value="lang">{{ lang }}</option>
      </select>
    </div>
    <div class="form-item">
      <label for="visibility" class="pr-2">Visibility</label>
      <select id="visibility" class="w-[70%] px-1 text-black" v-model="settings.visibility">
        <option v-for="v in Visibility" :key="v" :value="v">{{ v }}</option>
      </select>
    </div>
    <div class="flex mt-3 align-center justify-end">
      <button class="btn-default mx-2" @click="updateSettings">Save</button>
      <button class="btn-default mx-2" @click="router.back()">Cancel</button>
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
