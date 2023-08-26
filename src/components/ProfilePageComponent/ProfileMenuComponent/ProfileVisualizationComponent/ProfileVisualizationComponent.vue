<script setup lang="ts">
import { inject, reactive } from 'vue';
import { getUserInfo, setUserInfo } from '@/shared/functions/UserInfo';
import type { User } from '@/shared/types/user';
import { useQuery } from '@tanstack/vue-query';

let user: User | null = null;

const axios = inject('axios');

const fetcher = async () => {
  user = getUserInfo();
  return axios
    .get(`/users/profile/${user.id}`)
    .then((response: any): User => {
      user = response.data;
      setUserInfo(user);
      return user;
    })
    .catch((error: any) => Promise.reject(error));
};
const { isLoading, isError, data, error } = useQuery({
  queryKey: ['getFriendRequests'],
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
