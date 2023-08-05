<script lang="ts" setup>
import SearchBarComponent from './Dashboard/Controls/SearchBar/SearchBarComponent.vue';

// TODO: Replace profile router link with user profile picture component
</script>

<template>
  <div class="header-container fixed flex w-screen justify-between bg-amber-300">
    <nav class="links flex items-center gap-x-2.5">
      <RouterLink to="/dashboard/visualizepost">Home</RouterLink>
      <RouterLink to="/Auth">Auth</RouterLink>
    </nav>
    <SearchBarComponent />
    <div class="flex items-center gap-x-2.5">
      <RouterLink to="/profile">
        <svg class="profile-picture w-5 h-5">
          <g>
            <circle cx="50%" cy="50%" r="50%" fill="white" />
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="70%" fill="black">AG</text>
          </g>
        </svg>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container > nav {
  display: flex;
  gap: 10px;
}
</style>
