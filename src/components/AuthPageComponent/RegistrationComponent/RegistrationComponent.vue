<script lang="ts">
import { defineComponent } from 'vue';
import { passwordRegex, emailValidation } from '@/shared/functions/Validation';

export default defineComponent({
  data() {
    return {
      user: {
        firstName: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        repeatedPassword: '',
      },
      formErrors: {
        firstName: false,
        surname: false,
        username: false,
        email: false,
        password: false,
        repeatedPassword: false,
      },
      isFormInit: true,
      errorClasses: {
        'border-red-600': true,
        'border-2': true,
      },
    };
  },
  methods: {
    onFormSubmitInit() {
      // do checks
      if (!this.user.firstName) {
        this.formErrors.firstName = true;
      }

      if (!this.user.surname) {
        this.formErrors.surname = true;
      }

      if (!this.user.username) {
        this.formErrors.username = true;
      }

      if (this.user.firstName && this.user.surname && this.user.username) {
        this.isFormInit = false;
      }
    },
    onFormFinalize() {
      // do checks

      if (!this.user.email || !emailValidation(this.user.email)) {
        this.formErrors.email = true;
      }

      if (!this.user.password || !passwordRegex.test(this.user.password)) {
        this.formErrors.password = true;
      }

      if (!this.user.repeatedPassword || this.user.password !== this.user.repeatedPassword) {
        this.formErrors.repeatedPassword = true;
      }

      if (!this.formErrors.email && !this.formErrors.password && !this.formErrors.repeatedPassword) {
        this.signupUser();
      }
    },
    onFormBack() {
      this.isFormInit = true;
    },
    signupUser() {
      this.axios
        .post('/auth/signup/', {
          username: this.user.username,
          email: this.user.email,
          password: this.user.password,
        })
        .then((response: any) => {
          console.log(response);
        })
        .catch((error: any) => {
          console.log(error);
        });
    },
  },
  computed: {
    formHeader() {
      return this.isFormInit ? 'Tell me who you are!' : 'Finalize creation';
    },
    firstNameErrorClasses() {
      return this.formErrors.firstName ? this.errorClasses : {};
    },
    surnameErrorClasses() {
      return this.formErrors.surname ? this.errorClasses : {};
    },
    usernameErrorClasses() {
      return this.formErrors.username ? this.errorClasses : {};
    },
    emailErrorClasses() {
      return this.formErrors.email ? this.errorClasses : {};
    },
    passwordErrorClasses() {
      return this.formErrors.password ? this.errorClasses : {};
    },
    repeatedPasswordErrorClasses() {
      return this.formErrors.repeatedPassword ? this.errorClasses : {};
    },
  },
});
</script>

<template>
  <div class="flex flex-col mt-5 p-5">
    <div class="form-header mb-5">
      <h1 class="text-center text-2xl">{{ formHeader }}</h1>
    </div>
    <form v-if="isFormInit" class="form-body-init flex flex-col gap-10" @submit.prevent="onFormSubmitInit">
      <input
        type="text"
        v-model="user.firstName"
        placeholder="First name"
        class="rounded-lg indent-2"
        :class="firstNameErrorClasses"
        @keyup="formErrors.firstName = false" />
      <input
        type="text"
        v-model="user.surname"
        placeholder="Last name"
        class="rounded-lg indent-2"
        :class="surnameErrorClasses"
        @keyup="formErrors.surname = false" />
      <input
        type="text"
        v-model="user.username"
        placeholder="Username"
        class="rounded-lg indent-2"
        :class="usernameErrorClasses"
        @keyup="formErrors.username = false" />
      <button class="btn-default">Continue</button>
    </form>
    <form v-else class="form-body-fin w-full flex flex-col gap-10" @submit.prevent="onFormFinalize">
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
      <input
        type="password"
        v-model="user.repeatedPassword"
        placeholder="Repeat password"
        class="rounded-lg indent-2"
        :class="repeatedPasswordErrorClasses"
        @keyup="formErrors.repeatedPassword = false" />
      <div class="btn-container flex flex-row gap-5 justify-center items-center">
        <button type="button" @click="onFormBack" class="btn-default">Back</button>
        <button type="submit" class="btn-default">Register</button>
      </div>
    </form>
  </div>
</template>
