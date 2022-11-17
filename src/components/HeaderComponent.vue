<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      asd: '',
    };
  },
});
</script>

<template>
  <div class="header-container">
    <nav>
      <div class="links ml-auto flex flex-wrap gap-x-2.5">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/Auth">Auth</RouterLink>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.container > nav {
  display: flex;
  gap: 10px;
}
</style>
