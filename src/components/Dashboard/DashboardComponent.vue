<script setup lang="ts">
import DashboardControlsComponent from './Controls/DashboardControlsComponent.vue';
</script>
<template>
  <div class="h-full w-full flex flex-col md:flex-row items-center justify-center bg-dark-blue p-5 overflow-y-auto">
    <div class="posts h-full w-4/5 md:w-2/3 overflow-y-hidden border-0 pt-4">
      <router-view :key="$route.fullPath" />
    </div>
    <div class="dashboard-functions h-full w-4/5 md:w-1/3 bg-blue p-5 rounded-xl">
      <DashboardControlsComponent />
    </div>
  </div>
</template>
