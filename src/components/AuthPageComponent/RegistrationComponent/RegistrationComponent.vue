<script lang="ts" setup>
import { reactive, inject, computed } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { passwordValidation, emailValidation } from '@/shared/functions/Validation';

import type { FormUser, FormErrors } from './RegistrationComponentTypes';

const axios: any = inject('axios');
const queryClient = useQueryClient();

const user: FormUser = reactive({
  firstName: '',
  surname: '',
  username: '',
  email: '',
  password: '',
  repeatedPassword: '',
});

const formErrors: FormErrors = reactive({
  firstName: false,
  surname: false,
  username: false,
  email: false,
  password: false,
  repeatedPassword: false,
});

const errorClasses = {
  'border-red-600': true,
  'border-2': true,
};

const state = reactive({
  isFormInit: true,
});

const userMutation = useMutation({
  mutationFn: (newUser: FormUser) => {
    return axios
      .post('/auth/signup', {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        name: newUser.firstName,
        surname: newUser.surname,
      })
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
  },
});

function onFormSubmitInit() {
  // do checks
  if (!user.firstName) {
    formErrors.firstName = true;
  }

  if (!user.surname) {
    formErrors.surname = true;
  }

  if (!user.username) {
    formErrors.username = true;
  }

  if (user.firstName && user.surname && user.username) {
    state.isFormInit = false;
  }
}

function onFormFinalize() {
  // do checks

  if (!user.email || !emailValidation(user.email)) {
    formErrors.email = true;
  }

  if (!user.password || !passwordValidation(user.password)) {
    formErrors.password = true;
  }

  if (!user.repeatedPassword || user.password !== user.repeatedPassword) {
    formErrors.repeatedPassword = true;
  }

  if (!formErrors.email && !formErrors.password && !formErrors.repeatedPassword) {
    userMutation.mutate(user);
  }
}

function onFormBack() {
  state.isFormInit = true;
}

const formHeader = computed(() => {
  return state.isFormInit ? 'Tell me who you are!' : 'Finalize creation';
});

const firstNameErrorClasses = computed(() => {
  return formErrors.firstName ? errorClasses : {};
});

const surnameErrorClasses = computed(() => {
  return formErrors.surname ? errorClasses : {};
});

const usernameErrorClasses = computed(() => {
  return formErrors.username ? errorClasses : {};
});

const emailErrorClasses = computed(() => {
  return formErrors.email ? errorClasses : {};
});

const passwordErrorClasses = computed(() => {
  return formErrors.password ? errorClasses : {};
});

const repeatedPasswordErrorClasses = computed(() => {
  return formErrors.repeatedPassword ? errorClasses : {};
});
</script>

<template>
  <div class="flex flex-col mt-5 p-5">
    <div class="form-header mb-5">
      <h1 class="text-center text-2xl">{{ formHeader }}</h1>
    </div>
    <form v-if="state.isFormInit" class="form-body-init flex flex-col gap-10" @submit.prevent="onFormSubmitInit">
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
