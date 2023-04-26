<script setup lang="ts">
import SearchBarComponent from './SearchBar/SearchBarComponent.vue';
</script>
<template>
  <div class="">
    <SearchBarComponent />
    <div class="mt-10 btn-default text-center">
      <RouterLink to="/dashboard/createpost" class="flex flex-col">Create post</RouterLink>
    </div>
  </div>
</template>
