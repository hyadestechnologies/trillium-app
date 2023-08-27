<script setup lang="ts">
import PostComponent from './PostComponent.vue';

import type { Post } from './PostComponentTypes';

defineProps<{
  posts: Post[];
}>();
</script>
<template>
  <ul class="list-none text-black border-0 last:border-b-0" v-for="p in posts">
    <li>
      <PostComponent :post="p" />
    </li>
  </ul>
</template>
