<script setup lang="ts">
import FriendComponent from './FriendComponent.vue';

import type { User } from '@/shared/types/user';

defineProps<{
  users: User[];
}>();
</script>
<template>
  <ul class="list-none border-b border-transparent border-2 last:border-b-0" v-for="u in users">
    <li>
      <FriendComponent :user="u" />
    </li>
  </ul>
</template>
