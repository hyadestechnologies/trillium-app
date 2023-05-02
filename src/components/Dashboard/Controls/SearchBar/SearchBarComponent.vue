<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import PostListComponent from '../../Post/PostListComponent.vue';
import { useQuery } from '@tanstack/vue-query';
import type { Post } from '../../Post/PostComponentTypes';

const axios: any = inject('axios');

let timer: number | undefined = undefined;
const numPosts = 3;

const searchTerm = ref('');
const isSearchBarFocused = ref(true);

const { isLoading, isError, data, error, refetch } = useQuery({
  queryKey: ['search', searchTerm.value],
  queryFn: (): Promise<Post[]> =>
    axios
      .post('/posts/search/', {
        searchQuery: searchTerm.value,
        page: 0,
        pageSize: numPosts,
      })
      .then((response: any): Post[] => response.data)
      .catch((error: any) => Promise.reject(error)),
  enabled: false,
});

function startSearch() {
  return new Promise(resolve => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    if (searchTerm.value && searchTerm.value.length > 3) {
      timer = setTimeout(() => {
        resolve(refetch());
      }, 300);
    }
  });
}

async function search() {
  await startSearch();
}

const searchResultHidden = computed(() => (isSearchBarFocused.value && searchTerm.value.length > 3 ? '' : 'hidden'));
</script>
<template>
  <div class="h-0">
    <input
      type="search"
      name="searchbar"
      id="searchbar"
      placeholder="Search..."
      data-dropdown-toggle="dropdownUsers"
      data-dropdown-placement="bottom"
      class="w-full"
      v-model="searchTerm"
      @keyup="search()"
      @focus="isSearchBarFocused = true"
      @blur="isSearchBarFocused = false" />
    <div id="dropdownSearch" :class="searchResultHidden" class="z-10 bg-red-400">
      <h4 class="border-b border-amber-300">Post</h4>
      <span class="error" v-if="isError">{{ error }}</span>
      <span class="" v-else-if="isLoading && searchTerm.length > 0">Loading...</span>
      <span class="" v-else-if="searchTerm.length > 3 && data?.length === 0">No result</span>
      <PostListComponent :posts="data.slice(0, 4)" v-else-if="data" />

      <a href="#" class="flex items-center justify-center">Show more</a>
    </div>
  </div>
</template>
