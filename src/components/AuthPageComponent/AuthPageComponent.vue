<script lang="ts">
export default {
  Data() {
    return {
      isLogin: false,
    };
  },
  methods: {},
};
</script>

<template>
  <div class="auth-page-container flex h-full bg-white">
    <div
      class="form-container flex flex-row w-[60vw] h-[60vh] bg-red-300 m-auto rounded-2xl border-black border-2 shadow-neo">
      <div class="oauth-container w-1/2 h-full m-auto">
        <h1>this is a container for oauth</h1>
      </div>
      <div class="email-auth-container w-1/2 h-full m-auto">
        <h1>This is a container for email auth</h1>
      </div>
    </div>
  </div>
</template>

<style></style>
