<script setup lang="ts">
import type { User } from '@/shared/types/user';

defineProps<{
  user: User;
}>();
</script>

<template>
  <div class="w-full h-full flex justify-center content-center">
    <img
      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      :alt="user.username"
      class="rounded-full w-auto h-auto min-h-0" />
  </div>
</template>
