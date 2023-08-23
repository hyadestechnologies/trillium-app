<script setup lang="ts">
import type { User } from '@/shared/types/user';
import UserComponent from '@/components/Dashboard/User/UserComponent.vue';

// TODO: Accept or deny friend request
function acceptFriendRequest() {}
function denyFriendRequest() {}

defineProps<{
  user: User;
}>();
</script>
<template>
  <div class="relative z-0 flex bg-amber-300">
    <UserComponent :user="user" />
    <div class="absolute flex w-full h-full items-end justify-end">
      <button class="w-[20%] m-2 p-2 rounded-lg bg-blue-400" @click="acceptFriendRequest">Accept</button>
      <button class="w-[20%] m-2 p-2 rounded-lg bg-red-400" @click="denyFriendRequest">Deny</button>
    </div>
  </div>
</template>
