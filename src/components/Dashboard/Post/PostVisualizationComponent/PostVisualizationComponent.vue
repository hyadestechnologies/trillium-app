<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { inject, ref } from 'vue';

const axios: any = inject('axios');

const numPosts = 5;
let page = ref(0);

// Get posts based on the page
const { isLoading, isError, data, error } = useQuery({
  queryKey: ['getPosts'],
  queryFn: () => axios.get('/posts/getAll/${page}/${numPosts}'),
  select: response => response.data,
});
</script>
<template>
  <div class="h-100 flex flex-col p-5">
    <div class="flex flex-col gap-1">
      <span class="error" v-if="isError">{{ error }}</span>
      <span class="" v-else-if="isLoading">Loading...</span>
      <div v-else-if="data">
        <ul>
          <li class="list-none" v-for="post in data" :key="post.id">
            <h3 class="mt-5 font-bold">{{ post.title }}</h3>
            <p>{{ post.description }}</p>
          </li>
        </ul>

        <div class="">
          <button class="btn-default">&lt prev</button>
          <button class="btn-default">next &gt</button>
        </div>
      </div>
    </div>
  </div>
</template>
