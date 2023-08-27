<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

export default defineComponent({
  data() {
    return {};
  },
  components: { HeaderComponent, FooterComponent },
});
</script>
<template>
  <div class="page-container flex flex-col content-center h-screen w-screen">
    <HeaderComponent class="h-50 w-full order-1" />
    <div class="router-container order-2 grow">
      <RouterView />
    </div>
    <FooterComponent class="sticky bottom-0 h-50 w-full order-3 self-end" />
  </div>
</template>

<style scoped></style>
