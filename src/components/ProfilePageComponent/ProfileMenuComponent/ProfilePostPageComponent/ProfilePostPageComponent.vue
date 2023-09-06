<script setup lang="ts">
import { inject } from 'vue';
import { useInfiniteQuery, type InfiniteData } from '@tanstack/vue-query';
import PostListComponent from '@/components/Dashboard/Post/PostListComponent.vue';
import type { Post } from '@/components/Dashboard/Post/PostComponentTypes';

const axios: any = inject('axios');
const numPosts = 5;

// TODO: Get user personal posts
const fetcher = async ({ pageParam = 0 }) =>
  axios.post('/posts/search', {
    searchQuery: '',
    page: pageParam,
    pageSize: numPosts,
  });
// Get posts based on the page
const { isLoading, isError, data, error, fetchNextPage, hasNextPage } = useInfiniteQuery(['getPosts'], fetcher, {
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
</script>

<template>
  <div class="posts h-full m-2 overflow-y-auto" @scroll="loadPage">
    <PostListComponent :posts="[]" />
  </div>
</template>
