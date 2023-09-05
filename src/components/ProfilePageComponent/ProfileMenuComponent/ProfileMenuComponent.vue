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
    <div class="w-full h-auto max-h-[40%] p-4 flex flex-col justify-center items-center">
      <UserPictureComponent :user="user" />
      <RouterLink to="/profile/updateprofile">
        <div class="flex flex-row m-2 h-5 justify-center items-center">
          <img
            src="https://www.iconarchive.com/download/i96727/iconsmind/outline/Pen.ico"
            alt="update-profile"
            class="h-full w-auto filter invert" />
          Modify
        </div>
      </RouterLink>
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
