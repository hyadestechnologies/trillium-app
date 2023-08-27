<script setup lang="ts">
import type { User } from '@/shared/types/user';
import UserComponent from '@/components/Dashboard/User/UserComponent.vue';
import { inject } from 'vue';
import { getAuthToken } from '@/shared/functions/request';
import { useQuery } from '@tanstack/vue-query';

const axios: any = inject('axios');

const acceptRequestFetcher = async () => {
  const userJson: string | null = localStorage.getItem('user');
  if (userJson === null) Promise.reject('Failed to get user information');

  const currentUser: User = userJson !== null ? JSON.parse(userJson) : {};

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getAuthToken();
  return axios
    .get(`/users/accept_request/${user.id}`)
    .then((response: any): User[] => response.data)
    .catch((error: any) => Promise.reject(error));
};

// TODO: Fetch friends list
const { isLoading, isError, data, error, refetch } = useQuery({
  queryKey: ['getFriendRequests'],
  queryFn: acceptRequestFetcher,
  enabled: false,
});

// TODO: Accept or deny friend request
function acceptFriendRequest() {
  refetch();
}
function denyFriendRequest() {}

defineProps<{
  user: User;
}>();
</script>
<template>
  <div class="relative z-0 flex bg-amber-300">
    <UserComponent :user="user" />
    <div class="absolute flex w-full h-full items-end justify-end">
      <button class="w-[20%] m-2 p-2 rounded-lg bg-blue-400" @click="acceptFriendRequest">Accept</button>
      <button class="w-[20%] m-2 p-2 rounded-lg bg-red-400" @click="denyFriendRequest">Deny</button>
    </div>
  </div>
</template>
