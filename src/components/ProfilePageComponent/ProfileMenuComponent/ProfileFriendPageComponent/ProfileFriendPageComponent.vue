<script setup lang="ts">
import UserComponent from '@/components/Dashboard/User/UserComponent.vue';
import type { User } from '@/shared/types/user';

let user: User = {
  username: 'username',
  password: '',
};
</script>

<template>
  <div>
    <UserComponent :user="user" />
  </div>
</template>
