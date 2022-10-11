<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

export default defineComponent({
  data() {
    return {
      asd: '',
    };
  },
  components: { HeaderComponent, FooterComponent },
});
</script>

<template>
  <div class="container">
    <HeaderComponent />
    <RouterView />
    <FooterComponent />
  </div>
</template>

<style scoped></style>
