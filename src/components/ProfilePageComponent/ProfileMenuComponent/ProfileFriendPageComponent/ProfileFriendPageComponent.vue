<script setup lang="ts">
import { inject } from 'vue';
import UserListComponent from '@/components/Dashboard/User/UserListComponent.vue';
import FriendListComponent from '@/components/Dashboard/User/Friend/FriendListComponent.vue';

import type { User } from '@/shared/types/user';
import { useQuery } from '@tanstack/vue-query';
import { getAuthToken } from '@/shared/functions/request';
import { getUserInfo } from '@/shared/functions/UserInfo';

const axios: any = inject('axios');

const friendRequestFetcher = async () => {
  const user: User | null = getUserInfo();
  if (user === null) {
    Promise.reject('Failed to get user information');
    return;
  }

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getAuthToken();
  return axios
    .get(`/users/friend_requests`, {
      user: user.username,
    })
    .then((response: any): User[] => response.data)
    .catch((error: any) => Promise.reject(error));
};

// TODO: Fetch friends list
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
