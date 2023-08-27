<script lang="ts" setup>
import { computed } from 'vue';
import SearchBarComponent from './Dashboard/Controls/SearchBar/SearchBarComponent.vue';
import UserPictureComponent from './Dashboard/User/UserPictureComponent.vue';
import { getAuthToken } from '@/shared/functions/request';

import type { User } from '@/shared/types/user';

// TODO: Fetch user if logged in
let dummy: User = {
  username: 'username',
  password: '',
};

// TODO: Check if auth token is correct
const isUserLogged = computed(() => getAuthToken() !== null);
// TODO: Reload profile picture after login
</script>

<template>
  <div class="header-container fixed flex w-screen justify-between bg-blue text-light-blue p-1">
    <nav class="links flex items-center gap-x-2.5">
      <RouterLink to="/dashboard/visualizepost">Home</RouterLink>
      <RouterLink to="/Auth">Auth</RouterLink>
    </nav>
    <SearchBarComponent />
    <div class="w-6 h-auto">
      <RouterLink to="/profile" class="w-fit h-fit" v-if="isUserLogged">
        <UserPictureComponent :user="dummy" />
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
