<script setup lang="ts">
import type { Post } from './PostComponentTypes';

defineProps<{
  post: Post;
}>();
</script>
<template>
  <div class="p-3 bg-yellow mt-2 mb-2 border-0">
    <h3 class="text-xl font-bold mb-2">{{ post.title }}</h3>
    <p class="">{{ post.description }}</p>
  </div>
</template>
