<script setup lang="ts">
import { findProp } from '@vue/compiler-core';
import PostComponent from './PostComponent.vue';

import type { Post } from './PostComponentTypes';

defineProps<{
  posts: Post[];
}>();
</script>
<template>
  <ul class="list-none border-b border-transparent border-2 last:border-b-0" v-for="p in posts">
    <li class="">
      <PostComponent :post="p" />
    </li>
  </ul>
</template>
