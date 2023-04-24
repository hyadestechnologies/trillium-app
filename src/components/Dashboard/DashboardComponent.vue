<script setup lang="ts"></script>
<template>
  <div class="h-full w-full flex flex-col md:flex-row items-center justify-center bg-red-300 p-5 overflow-y-auto">
    <div class="posts h-full w-4/5 md:w-2/3 overflow-y-hidden">
      <router-view />
    </div>
    <div class="dashboard-functions h-full w-4/5 md:w-1/3 bg-red-400 p-5 rounded-xl">
      this container contains dashboard controls (like search, create post btn, ecc)
    </div>
  </div>
</template>
