<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      formErrors: {
        email: false,
        password: false,
      },
    };
  },

  methods: {
    onFormSubmit() {
      // TODO: Do checks
      // TODO: Send credentials to backend
      if (!this.user.email) {
        console.log('[login] Email is not set!');
        return;
      }
      if (!this.user.password) {
        console.log('[login] Password is not set!');
        return;
      }

      console.log('[login] Form has been submitted');
    },
  },
});
</script>

<template>
  <div class="flex flex-col mt-5 p-5">
    <div class="form-header">
      <h1 class="text-center text-2xl">Insert your credentials</h1>
    </div>
    <form class="form-body flex flex-col gap-10" @submit.prevent="onFormSubmit">
      <input type="text" v-model="user.email" placeholder="Email" class="rounded-lg indent-2" />
      <input type="password" v-model="user.password" placeholder="Password" class="rounded-lg indent-2" />

      <button class="btn-default">Login</button>
    </form>
  </div>
</template>
