<script setup lang="ts">
import TagFilterComponent from './TagFilterComponent.vue';

defineProps<{
  tags: string[];
}>();
</script>
<template>
  <div class="flex flex-col justify-center mt-4">
    <h3 class="border-b-2 border-black">Tags</h3>

    <ul v-for="tag in tags">
      <li><TagFilterComponent :tag="tag" /></li>
    </ul>
  </div>
</template>
