<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

export default defineComponent({
  data() {
    return {
    };
  },
  components: { HeaderComponent, FooterComponent },
});
</script>

<template>
  <div class="container">
    <HeaderComponent />
    <div class="routerContainer">
      <RouterView />
    </div>
    <FooterComponent />
  </div>
</template>

<style scoped></style>
