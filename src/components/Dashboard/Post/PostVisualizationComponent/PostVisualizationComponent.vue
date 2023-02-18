<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { inject } from 'vue';
import PostListComponent from '../PostListComponent.vue';

const axios: any = inject('axios');

const numPosts = 20;
let page = 0;

// Get posts based on the page
const postGetQuery = useQuery({
  queryKey: ['getPosts'],
  queryFn: () => axios.get('/posts/getAll/' + page + '/' + numPosts),
  select: response => response.data,
});
const { isLoading, isError, data, error } = postGetQuery;

//TODO: Load on scroll
function loadPage(event: any) {
  const target = event.currentTarget;
  let bottom = target.scrollTop + target.innerHeight === target.offsetHeight;

  if (bottom) {
    page++;
    postGetQuery.refetch();
  }
}
</script>
<template>
  <div class="h-100 flex flex-col p-5">
    <div class="flex flex-col gap-1 scroll-auto" @scroll="loadPage">
      <span class="error" v-if="isError">{{ error }}</span>
      <span class="" v-else-if="isLoading">Loading...</span>
      <div v-else-if="data">
        <PostListComponent :posts="data" />
      </div>
    </div>
  </div>
</template>
