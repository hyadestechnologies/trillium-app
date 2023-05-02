<script lang="ts" setup>
import SearchBarComponent from './Dashboard/Controls/SearchBar/SearchBarComponent.vue';
</script>

<template>
  <div class="header-container grid grid-cols-3 fixed w-screen justify-center bg-amber-300">
    <nav class="links flex items-center gap-x-2.5">
      <RouterLink to="/dashboard/visualizepost">Home</RouterLink>
      <RouterLink to="/Auth">Auth</RouterLink>
    </nav>
    <SearchBarComponent />
  </div>
</template>

<style scoped>
.container > nav {
  display: flex;
  gap: 10px;
}
</style>
