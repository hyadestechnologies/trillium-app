<script setup lang="ts">
import { inject } from 'vue';
import UserListComponent from '@/components/Dashboard/User/UserListComponent.vue';
import FriendListComponent from '@/components/Dashboard/User/Friend/FriendListComponent.vue';
import app from '@/main';

import type { User } from '@/shared/types/user';
import { useQuery } from '@tanstack/vue-query';
import { getAuthToken } from '@/shared/functions/request';

const axios: any = inject('axios');

const friendRequestFetcher = async () => {
  const userJson: string | null = localStorage.getItem('user');
  if (userJson === null) Promise.reject('Failed to get user information');

  const user: User = userJson !== null ? JSON.parse(userJson) : {};

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getAuthToken();
  return axios
    .get(`/users/friend_requests`, {
      user: user.username,
    })
    .then((response: any): User[] => response.data)
    .catch((error: any) => Promise.reject(error));
};

// TODO: Fetch friends list
// TODO: Fetch friend requests list
const { isLoading, isError, data, error } = useQuery({
  queryKey: ['getFriendRequests'],
  queryFn: friendRequestFetcher,
});
</script>

<template>
  <div class="users h-full m-2 overflow-y-auto">
    <span class="error" v-if="isError">{{ error }}</span>
    <span class="" v-else-if="isLoading">Loading...</span>
    <FriendListComponent :users="data" v-else-if="data" />
    <UserListComponent :users="[]" />
  </div>
</template>
