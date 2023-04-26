<script setup lang="ts">
import { ref, inject } from 'vue';
import PostListComponent from '../../Post/PostListComponent.vue';
import { useQuery } from '@tanstack/vue-query';

const axios: any = inject('axios');

let timer: number | undefined = undefined;

const searchTerm = ref('');
const { isLoading, isError, data, error, refetch } = useQuery({
  queryKey: ['search', searchTerm.value],
  queryFn: (): Promise<Response> =>
    axios
      .post('/posts/search/', {
        title: searchTerm.value,
      })
      .then((response: any) => response.data)
      .catch((error: any) => Promise.reject(error)),
  enabled: false,
});

function startSearch() {
  return new Promise(resolve => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    if (searchTerm.value) {
      timer = setTimeout(() => {
        resolve(refetch());
      }, 200);
    }
  });
}

async function search() {
  await startSearch();
}
</script>
<template>
  <div>
    <input
      type="search"
      name="search-bar"
      id="search-bar"
      placeholder="Search..."
      class="w-full"
      v-model="searchTerm"
      @keyup="search()" />
    <div>
      <h4 class="border-b border-black">Post</h4>
      <span class="error" v-if="isError">{{ error }}</span>
      <span class="" v-else-if="isLoading && searchTerm.length > 0">Loading...</span>
      <PostListComponent :posts="data" v-else-if="data" />
    </div>
  </div>
</template>
