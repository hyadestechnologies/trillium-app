<script setup lang="ts">
import UserListComponent from '@/components/Dashboard/User/UserListComponent.vue';
import type { User } from '@/shared/types/user';

// TODO: Fetch friends list
</script>

<template>
  <div class="users h-full m-2 overflow-y-auto">
    <UserListComponent :users="[]" />
  </div>
</template>
