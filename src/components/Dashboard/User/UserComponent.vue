<script setup lang="ts">
import type { User } from '@/shared/types/user';
import UserPictureComponent from './UserPictureComponent.vue';

defineProps<{
  user: User;
}>();
</script>
<template>
  <div class="flex p-3 bg-amber-300">
    <div class="max-w-[20%] p-3">
      <UserPictureComponent :user="user" />
    </div>
    <div class="m-3">
      <h3 class="text-xl font-bold mb-2">{{ user.username }}</h3>
      <p>{{ user.name }}</p>
    </div>
  </div>
</template>
