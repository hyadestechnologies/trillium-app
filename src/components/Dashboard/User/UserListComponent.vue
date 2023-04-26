<script setup lang="ts">
import type { User } from '@/shared/types/user';
import type UserComponent from './UserComponent.vue';

defineProps<{
  users: User[];
}>();
</script>
<template>
  <ul class="list-none border-b border-transparent border-2 last:border-b-0" v-for="u in users">
    <li class="">
      <UserComponent :user="u" />
    </li>
  </ul>
</template>
