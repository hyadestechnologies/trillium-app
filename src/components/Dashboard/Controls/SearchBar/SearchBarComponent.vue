<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import PostListComponent from '../../Post/PostListComponent.vue';
import type { Post } from '../../Post/PostComponentTypes';
import { useRoute } from 'vue-router';

const axios: any = inject('axios');

let timer: number | undefined = undefined;
const numPosts = 3;

const searchTerm = ref('');
const isSearchFocused = ref(false);

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
      timer = window.setTimeout(() => {
        resolve(refetch());
        isSearchFocused.value = true;
      }, 300);
    }
  });
}

async function search() {
  await startSearch();
}

function hideDropdown(event: any) {
  const searchDiv = document.getElementById('searchDiv');
  if (searchDiv) isSearchFocused.value = searchDiv.contains(event.relatedTarget);
}

const searchResultHidden = computed(() => (isSearchFocused.value && searchTerm.value.length > 3 ? '' : 'hidden'));
</script>
<template>
  <div class="h-0">
    <div class="h-fit" id="searchDiv" tab-index="-1" @focusout="hideDropdown($event)">
      <input
        type="search"
        name="searchbar"
        id="searchbar"
        placeholder="Search..."
        data-dropdown-toggle="dropdownUsers"
        data-dropdown-placement="bottom"
        class="w-full bg-dark-blue rounded-md"
        v-model="searchTerm"
        @keyup="search()"
        @focus="isSearchFocused = true" />
      <div id="searchDropdown" :class="searchResultHidden" class="z-10 bg-dark-blue border-8 border-blue" tabindex="-1">
        <h4 class="border-b border-amber-300">Post</h4>
        <span class="error" v-if="isError">{{ error }}</span>
        <span class="" v-else-if="isLoading && searchTerm.length > 0">Loading...</span>
        <span class="" v-else-if="searchTerm.length > 3 && data?.length === 0">No result</span>
        <PostListComponent :posts="data.slice(0, 4)" v-else-if="data" />

        <RouterLink
          :to="{
            path: '/dashboard/visualizepostsearch/' + searchTerm,
          }"
          class="flex items-center justify-center"
          @click.native="isSearchFocused = false"
          >Show more</RouterLink
        >
      </div>
    </div>
  </div>
</template>
