<script lang="ts">
import { defineComponent } from 'vue';
import RegistrationComponent from './RegistrationComponent/RegistrationComponent.vue';

export default defineComponent({
  data() {
    return {
      isLogin: false,
    };
  },
  components: {
    RegistrationComponent,
  },
  methods: {
    onCustomAuthClicked(authType: string) {
      if (authType === 'google') {
        // call api
        return;
      }

      if (authType === 'facebook') {
        // call api
        return;
      }
    },
    ToggleAuthMode(authType: string) {
      if (authType === 'login') {
        this.isLogin = true;
        return;
      }

      if (authType === 'signup') {
        this.isLogin = false;
        return;
      }
    },
  },
  computed: {
    getLogin(): boolean {
      return this.isLogin;
    },
  },
});
</script>

<template>
  <div class="auth-page-container flex h-full bg-red-300">
    <div class="form-container flex flex-col w-[80vw] h-[70vh] m-auto rounded-2xl">
      <h1 class="text-center font-bold">WELCOME!</h1>
      <div class="flex flex-col md:flex-row h-full w-full mt-2 md:mt-10">
        <div class="oauth-container w-full md:w-1/2 h-fit md:h-full m-auto md:m-0 flex flex-col">
          <div class="info-container flex flex-col gap-10">
            <h3 class="text-center">Login or signup with an existing Google / Facebook account</h3>
            <div class="logo-container flex flex-row gap-20 items-center justify-center mt-10">
              <img
                @click="onCustomAuthClicked('google')"
                alt="google logo"
                srcset="/src/assets/images/google.png"
                class="w-14 h-14 cursor-pointer" />
              <img
                @click="onCustomAuthClicked('facebook')"
                alt="facebook logo"
                srcset="/src/assets/images/facebook_2.png"
                class="w-14 h-14 cursor-pointer" />
            </div>
          </div>
        </div>
        <div
          class="email-auth-container w-full md:w-1/2 h-full m-auto flex flex-col mt-10 md:mt-0 border-amber-300 border-l-0 border-t-2 md:border-l-2 md:border-t-0">
          <div class="info-container">
            <div class="button-container flex flex-row gap-10 items-center justify-center">
              <button @click="ToggleAuthMode('login')" class="btn-default">Login</button>
              <button @click="ToggleAuthMode('signup')" class="btn-default">Signup</button>
            </div>
            <div v-if="getLogin">
              <h1>this is a placeholder for the login component</h1>
            </div>
            <div v-else>
              <RegistrationComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
