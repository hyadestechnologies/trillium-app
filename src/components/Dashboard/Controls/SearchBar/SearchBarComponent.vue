<script setup lang="ts">
import PostListComponent from '../../Post/PostListComponent.vue';
</script>
<template>
  <div>
    <input type="search" name="search-bar" id="search-bar" placeholder="Search..." class="w-full" />
    <div>
      <h4 class="border-b border-black">Post</h4>
      <PostListComponent :posts="[]" />
    </div>
  </div>
</template>
