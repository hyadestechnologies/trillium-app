<script setup lang="ts">
import DashboardControlsComponent from './Controls/DashboardControlsComponent.vue';
</script>
<template>
  <div class="h-4/5 w-full flex flex-col md:flex-row justify-start bg-dark-blue p-5 overflow-y-hidden">
    <div class="posts h-full w-4/5 md:w-2/3 overflow-y-hidden border-0 pt-4 mt-2">
      <router-view :key="$route.fullPath" />
    </div>
    <div class="dashboard-functions h-full w-4/5 md:w-1/3 bg-blue p-5 rounded-xl mt-4">
      <DashboardControlsComponent />
    </div>
  </div>
</template>
