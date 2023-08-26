<script setup lang="ts">
import { inject, reactive } from 'vue';
import { getUserInfo, setUserInfo } from '@/shared/functions/UserInfo';
import type { User } from '@/shared/types/user';
import { useQuery } from '@tanstack/vue-query';

let user: User | null = null;

const axios: any = inject('axios');

const fetcher = async () => {
  user = getUserInfo();
  if (user === null) {
    Promise.reject('Cannot get user ID');
    return;
  }

  return axios
    .get(`/users/profile/${user.id}`)
    .then((response: any): User => {
      if (response.data === null) throw new Error('Cannot get user ID');
      user = response.data;
      setUserInfo(response.data);
      return response.data;
    })
    .catch((error: any) => Promise.reject(error));
};
const { isLoading, isError, data, error } = useQuery({
  queryKey: ['visualizeProfile'],
  queryFn: fetcher,
});
</script>
<template>
  <div class="w-full h-full p-3 my-3" v-if="user !== null">
    <h1 class="text-3xl">{{ user.name }} {{ user.surname }}</h1>
    <h2 class="text-2xl text-zinc-600">{{ user.username }}</h2>
    <span class="text-md">{{ user.email }}</span>
    <p>{{ user.description }}</p>
  </div>
</template>
