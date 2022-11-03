<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      
    };
  },
  methods: {

  }
});
</script>

<template>
  <div class="container">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/test">Test</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.container > nav {
  display: flex;
  gap: 10px;
}
</style>
