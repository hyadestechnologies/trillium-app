<script setup lang="ts">
import type { User } from '@/shared/types/user';

defineProps<{
  user: User;
}>();
// TODO: Fix classes and attributes to fit multiple uses
// TODO: Svg not fitting circle
</script>

<template>
  <div class="profile-picture w-fit h-fit flex justify-center align-center">
    <svg class="">
      <g>
        <circle cx="50%" cy="50%" r="31%" fill="white" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="100%" fill="black">
          {{ user.username }}
        </text>
      </g>
    </svg>
  </div>
</template>
