<script setup lang="ts">
import { inject } from 'vue';
import UserListComponent from '@/components/Dashboard/User/UserListComponent.vue';
import FriendListComponent from '@/components/Dashboard/User/Friend/FriendListComponent.vue';

import type { User } from '@/shared/types/user';
import { useQuery } from '@tanstack/vue-query';

const axios: any = inject('axios');

const fetcher = async () => axios.get(`/users/friend_requests`);
// TODO: Fetch friends list
// TODO: Fetch friend requests list
// const { isLoading, isError, data, error } = useQuery(['getFriendRequests'], fetcher);
</script>

<template>
  <div class="users h-full m-2 overflow-y-auto">
    <FriendListComponent :users="[]" />
    <UserListComponent :users="[]" />
  </div>
</template>
