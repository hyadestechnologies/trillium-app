<script setup lang="ts">
import { getAuthToken } from '@/shared/functions/request';
import type { UserInfo } from '@/shared/types/user';
import { useQuery } from '@tanstack/vue-query';

import { inject } from 'vue';

const axios: any = inject('axios');

let userInfo: UserInfo;

const fetcher = async () => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getAuthToken();
  return axios.put(`/users/profile/update`, {
    userProfileInfo: userInfo,
  });
};

const { isLoading, isError, error, refetch } = useQuery({
  queryKey: ['updateProfile'],
  queryFn: fetcher,
  enabled: false,
});

function updateProfile() {
  refetch();
}
// TODO: Update profile information page
</script>

<template>
  <div class="w-full h-full">
    <label for="name">Name: </label>
    <input type="text" id="name" />

    <label for="surname">Surname: </label>
    <input type="text" id="surname" />
  </div>
</template>
