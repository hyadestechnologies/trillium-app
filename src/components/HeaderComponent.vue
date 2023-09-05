<script lang="ts" setup>
import { computed } from 'vue';
import SearchBarComponent from './Dashboard/Controls/SearchBar/SearchBarComponent.vue';
import UserPictureComponent from './Dashboard/User/UserPictureComponent.vue';
import { getAuthToken, deleteAuthToken } from '@/shared/functions/request';

import type { User } from '@/shared/types/user';
import { getUserInfo, deleteUserInfo } from '@/shared/functions/UserInfo';
import router from '@/router';

const user: User | null = getUserInfo();

function logout() {
  // Delete auth token and user info
  deleteAuthToken();
  deleteUserInfo();

  // Redirect to auth page
  router.push({ path: '/auth' }).then(() => location.reload());
}

const isUserLogged = computed(() => getAuthToken() !== null);
</script>

<template>
  <div class="header-container fixed flex w-screen justify-between bg-blue text-light-blue p-1">
    <nav class="links flex items-center gap-x-2.5">
      <RouterLink to="/dashboard/visualizepost">Home</RouterLink>
      <RouterLink to="/Auth" v-if="!isUserLogged">Auth</RouterLink>
      <button @click="logout" v-else>Logout</button>
    </nav>
    <SearchBarComponent />
    <div class="w-6 h-auto">
      <RouterLink to="/profile/visualizeprofile" class="w-fit h-fit" v-if="isUserLogged && user !== null">
        <UserPictureComponent :user="user" />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container > nav {
  display: flex;
  gap: 10px;
}
</style>
