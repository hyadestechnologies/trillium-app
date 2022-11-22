<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      formErrors: {
        username: false,
        password: false,
      },
      errorClasses: {
        'border-red-600': true,
        'border-2': true,
      },
      timer: 0,
    };
  },

  methods: {
    onFormSubmit() {
      if (!this.user.username) {
        this.formErrors.username = true;
      }
      if (!this.user.password) {
        this.formErrors.password = true;
      }

      if (this.user.username && this.user.password) {
        // TODO: Send credentials to backend
        console.log('[login] Form has been submitted');
      }
    },
    usernameValidation(username: string): boolean {
      // TODO: Username regex
      const usernameRegex = new RegExp(/^[a-zA-Z_]+$/);
      return usernameRegex.test(username);
    },
    passwordValidation(password: string): boolean {
      // TODO: Regex password
      const passwordRegex = new RegExp(
        /^(?=.\S{7,24}$)(?=.*[a-z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_{|}~])/
      );
      return passwordRegex.test(password);
    },
    startValidation(validator: (arg: string) => boolean, arg: string) {
      return new Promise(resolve => {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = 0;
        }
        this.timer = setTimeout(() => {
          resolve(validator(arg));
        }, 200);
      });
    },
    // Show errors based on username validation
    async checkUsername() {
      this.formErrors.username = !(await this.startValidation(this.usernameValidation, this.user.username));
    },
    // Show errors based on password validation
    async checkPassword() {
      this.formErrors.password = !(await this.startValidation(this.passwordValidation, this.user.password));
    },
  },

  computed: {
    usernameErrorClasses() {
      return this.formErrors.username ? this.errorClasses : {};
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
        v-model="user.username"
        placeholder="Username"
        class="rounded-lg indent-2"
        :class="usernameErrorClasses"
        @keyup="checkUsername()" />
      <input
        type="password"
        v-model="user.password"
        placeholder="Password"
        class="rounded-lg indent-2"
        :class="passwordErrorClasses"
        @keyup="checkPassword()" />

      <button type="submit" class="btn-default">Login</button>
    </form>
  </div>
</template>
