<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { inject, reactive } from 'vue';
import type { Post } from '../PostComponentTypes';

const axios: any = inject('axios');

const post: Post = reactive({
  title: '',
  description: '',
  media: [],
  data: '',
});

const createPostMutation = useMutation({
  mutationFn: (newPost: Post) => {
    return axios
      .post('/posts/create', {
        title: newPost.title,
        description: newPost.description,
        file: newPost.media,
      })
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
  },
});

function uploadFile(event: any) {
  post.media = event.target.files[0];
}

function createPost() {
  if (post.title && post.description) {
    createPostMutation.mutate(post);
  }
}
</script>
<template>
  <div class="h-100 flex flex-col p-5 text-light-blue">
    <h1 class="font-bold">Create new post</h1>
    <div class="form-container flex flex-col gap-1">
      <h3 class="mt-5 font-bold">Post title</h3>
      <input class="rounded-xl indent-2 bg-blue text-yellow" type="text" placeholder="Title" v-model="post.title" />
      <h3 class="mt-5 font-bold">Post description</h3>
      <textarea
        class="rounded-xl indent-2 resize-none bg-blue text-yellow"
        maxlength="255"
        name="description"
        id="descriptionTextArea"
        cols="30"
        rows="4"
        placeholder="Post description"
        v-model="post.description"></textarea>
      <h3 class="mt-5 font-bold" v>Post media (photo or video)</h3>
      <input
        class="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue file:text-light-blue hover:file:bg-yellow"
        type="file"
        @change="uploadFile" />
      <button class="mt-10 btn-default" @click="createPost">Create post</button>
    </div>
  </div>
</template>
