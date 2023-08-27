<script setup lang="ts">
import type { Post } from './PostComponentTypes';

defineProps<{
  post: Post;
}>();
</script>
<template>
  <div class="p-3 bg-amber-300">
    <h3 class="text-xl font-bold mb-2">{{ post.title }}</h3>
    <p class="">{{ post.description }}</p>
  </div>
</template>
