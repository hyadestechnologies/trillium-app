<script lang="ts" setup>
import ProfileMenuComponent from './ProfileMenuComponent/ProfileMenuComponent.vue';
</script>

<template>
  <div class="w-full h-full flex flex-col md:flex-row items-center justify-center bg-red-300 p-5 overflow-y-auto">
    <div class="w-4/5 md:w-3/4 h-full overflow-y-hidden">
      <router-view :key="$route.fullPath" />
    </div>
    <div class="profile-menu w-4/5 md:w-1/4 h-full overflow-hidden bg-red-400">
      <ProfileMenuComponent />
    </div>
  </div>
</template>
