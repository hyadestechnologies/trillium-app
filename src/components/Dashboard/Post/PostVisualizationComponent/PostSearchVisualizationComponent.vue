<script setup lang="ts">
import { useInfiniteQuery, type InfiniteData } from '@tanstack/vue-query';
import { inject } from 'vue';
import PostListComponent from '../PostListComponent.vue';

import type { Post } from '../PostComponentTypes';

const axios: any = inject('axios');

const numPosts = 5;

const fetcher = async ({ pageParam = 0 }) =>
  axios.post('/posts/search', {
    searchQuery: keyword,
    page: pageParam,
    pageSize: numPosts,
  });
const { isLoading, isError, data, error, fetchNextPage, hasNextPage } = useInfiniteQuery(['getPostsSearch'], fetcher, {
  getNextPageParam: (lastPage, pages) => {
    return pages.length;
  },
  keepPreviousData: true,
});

function getPosts(response: InfiniteData<Post>): Post[] {
  let out: Post[] = [];
  response.pages.forEach((posts, index) => (out = out.concat(posts.data)));
  return out;
}

function loadPage(event: any) {
  const target = event.currentTarget;

  let loadMore = target.scrollHeight - target.scrollTop - target.clientHeight;

  if (loadMore <= 20 && hasNextPage) {
    fetchNextPage();
  }
}

const { keyword } = defineProps<{
  keyword: '';
}>();
</script>
<template>
  <div class="posts h-full m-2 overflow-y-auto" @scroll="loadPage">
    <span class="error" v-if="isError">{{ error }}</span>
    <span class="" v-else-if="isLoading">Loading...</span>
    <div v-else-if="data">
      <PostListComponent :posts="getPosts(data)" />
    </div>
  </div>
</template>
