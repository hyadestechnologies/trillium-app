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
  <div class="auth-page-container flex h-full bg-red-300">
    <div class="form-container flex flex-col md:flex-row w-[80vw] h-[70vh] m-auto rounded-2xl">
      <div class="oauth-container w-full md:w-1/2 h-full m-auto md:m-0 flex flex-col">
        <div class="info-container mt-5">
          <h1>WELCOME!</h1>
          <h3>Login or signup with an existing Google / Facebook account</h3>

          <div class="logo-container">
            <img alt="google logo" srcset="/src/assets/images/google.png" class="w-8 h-8" />
          </div>
        </div>
      </div>
      <div class="email-auth-container w-full md:w-1/2 h-full m-auto flex flex-col">
        <div class="info-container mt-5">
          <h1>This is a container for email auth</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
