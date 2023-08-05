<script setup lang="ts">
import type { User } from '@/shared/types/user';
import UserPictureComponent from './UserPictureComponent.vue';

defineProps<{
  user: User;
}>();
</script>
<template>
  <div class="p-3 bg-amber-300">
    <UserPictureComponent :user="user" />
    <h3 class="text-xl font-bold mb-2">{{ user.username }}</h3>
  </div>
</template>
