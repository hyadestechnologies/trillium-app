<script setup lang="ts">
import TagFilterListComponent from '../Post/TagFilterComponent/TagFilterListComponent.vue';

// TODO: Load tags
</script>
<template>
  <div class="my-2 btn-default items-center justify-center">
    <RouterLink to="/dashboard/createpost" class="flex flex-col items-center justify-center">Create post</RouterLink>
  </div>
  <TagFilterListComponent :tags="[]" />
</template>
