<script setup lang="ts">
import type { User } from '@/shared/types/user';

defineProps<{
  user: User;
}>();
</script>
<template>
  <div class="p-3 bg-amber-300">
    <h3 class="text-xl font-bold mb-2">{{ user.username }}</h3>
  </div>
</template>
