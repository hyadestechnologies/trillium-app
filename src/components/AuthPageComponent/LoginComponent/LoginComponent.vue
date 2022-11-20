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
      errorClasses: {
        'border-red-600': true,
        'border-2': true,
      },
    };
  },

  methods: {
    onFormSubmit() {
      // TODO: Do checks
      // TODO: Send credentials to backend
      if (!this.user.email) {
        this.formErrors.email = true;
        console.log('[login] Email is not set!');
      }
      if (!this.user.password) {
        this.formErrors.password = true;
        console.log('[login] Password is not set!');
      }

      if (this.user.email && this.user.password) {
        console.log('[login] Form has been submitted');
      }
    },
  },

  computed: {
    emailErrorClasses() {
      return this.formErrors.email ? this.errorClasses : {};
    },
    passwordErrorClasses() {
      return this.formErrors.password ? this.errorClasses : {};
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
      <input
        type="text"
        v-model="user.email"
        placeholder="Email"
        class="rounded-lg indent-2"
        :class="emailErrorClasses"
        @keyup="formErrors.email = false" />
      <input
        type="password"
        v-model="user.password"
        placeholder="Password"
        class="rounded-lg indent-2"
        :class="passwordErrorClasses"
        @keyup="formErrors.password = false" />

      <button type="submit" class="btn-default">Login</button>
    </form>
  </div>
</template>
