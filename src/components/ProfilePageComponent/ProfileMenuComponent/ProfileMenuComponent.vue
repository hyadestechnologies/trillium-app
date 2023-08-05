<script setup lang="ts">
import UserPictureComponent from '@/components/Dashboard/User/UserPictureComponent.vue';
import type { User } from '@/shared/types/user';

let user: User = {
  username: 'username',
  password: '',
};
</script>

<template>
  <div class="w-full h-full flex flex-col p-3">
    <div class="w-full h-auto flex justify-center">
      <UserPictureComponent :user="user" />
    </div>
    <div class="w-auto h-full m-2 p-2 border-t-2 border-black">
      <ul>
        <li><RouterLink to="/profile/posts">Posts</RouterLink></li>
        <li><RouterLink to="/profile/friends">Friends</RouterLink></li>
        <li><RouterLink to="/profile/followed">Followed</RouterLink></li>
      </ul>
    </div>
  </div>
</template>
