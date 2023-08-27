<script setup lang="ts">
defineProps<{
  tag: string;
}>();
</script>
<template>
  <div>
    <input type="checkbox" :name="tag" :id="tag" />
    <label :for="tag">{{ tag }}</label>
  </div>
</template>
