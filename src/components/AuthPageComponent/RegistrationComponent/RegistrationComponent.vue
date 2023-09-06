<script lang="ts" setup>
import { ref, reactive, inject, computed } from 'vue';
import { useMutation, useQueryClient, useQuery } from '@tanstack/vue-query';
import { passwordValidation, emailValidation } from '@/shared/functions/Validation';

import type { User } from '@/shared/types/user';
import type { FormErrors } from './RegistrationComponentTypes';
import router from '@/router';
import { setUserInfo } from '@/shared/functions/UserInfo';
import { getAuthToken, setAuthToken } from '@/shared/functions/request';





const axios: any = inject('axios');
const queryClient = useQueryClient();

const user: User = reactive({
  name: '',
  surname: '',
  username: '',
  email: '',
  password: '',
});
const repeatedPassword = ref('');

const formErrors: FormErrors = reactive({
  name: false,
  surname: false,
  username: false,
  email: false,
  password: false,
  repeatedPassword: false,
});

const errorClasses = {
  'border-light-red': true,
  'border-2': true,
};

const state = reactive({
  isFormInit: true,
});

const loginQuery = useQuery({
  queryKey: ['login', user],
  queryFn: async (): Promise<Response> => {
    if (axios == null) {
      return new Promise(() => Promise.reject());
    }
    const res = axios
      .post('/auth/login/', {
        username: user.username,
        password: user.password,
      })
      .then((response: any) => response.data)
      .catch((error: any) => Promise.reject(error));
    return res;
  },
  enabled: false,
});

const userMutation = useMutation({
  mutationFn: (newUser: User) => {
    return axios
      .post('/auth/signup', {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        name: newUser.name,
        surname: newUser.surname,
      })
      .then((response: any) => response.data)
      .catch((error: any) => Promise.reject(error));
  },
});

function onFormSubmitInit() {
  // do checks
  if (!user.name) formErrors.name = true;
  if (!user.surname) formErrors.surname = true;
  if (!user.username) formErrors.username = true;
  if (user.name && user.surname && user.username) state.isFormInit = false;
}

function onFormFinalize() {
  // Check if fields are empty
  if (!user.email || !emailValidation(user.email)) formErrors.email = true;
  if (!user.password || !passwordValidation(user.password)) formErrors.password = true;
  if (!repeatedPassword.value || user.password !== repeatedPassword.value) formErrors.repeatedPassword = true;

  if (!formErrors.email && !formErrors.password && !formErrors.repeatedPassword) {
    // Register
    userMutation.mutate(user);
    
    loginQuery
      .refetch()
      .then(() => {
        const response: any = loginQuery.data.value;
        if (response === undefined) throw new Error('Undefined login response');

        // Save user information
        user.password = '';
        user.id = response.user.id;
        user.email = response.user.email;
        user.name = response.user.name;
        user.surname = response.user.surname;
        user.description = response.user.description;
        user.creationDate = response.user.creationDate;
        user.lastUpdate = response.user.lastUpdate;
        setUserInfo(user);

        // Save token to local storage
        setAuthToken(response.access_token);
        // Redirect to home
        router.push({ path: '/dashboard/visualizepost' }).then(() => location.reload());
      })
      .catch((error: any) => {
        console.log(error);
      });    // TODO: Automatic log in
    // const queryKey = ['login'];
    // queryClient
    //   .refetchQueries({ predicate: query => query.queryKey[0] === 'login' })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //   });
  }
}

function onFormBack() {
  state.isFormInit = true;
}

const formHeader = computed(() => {
  return state.isFormInit ? 'Tell me who you are!' : 'Finalize creation';
});

const nameErrorClasses = computed(() => {
  return formErrors.name ? errorClasses : {};
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
        v-model="user.name"
        placeholder="First name"
        class="rounded-lg indent-2 bg-blue"
        :class="nameErrorClasses"
        @keyup="formErrors.name = false" />
      <input
        type="text"
        v-model="user.surname"
        placeholder="Last name"
        class="rounded-lg indent-2 bg-blue"
        :class="surnameErrorClasses"
        @keyup="formErrors.surname = false" />
      <input
        type="text"
        v-model="user.username"
        placeholder="Username"
        class="rounded-lg indent-2 bg-blue"
        :class="usernameErrorClasses"
        @keyup="formErrors.username = false" />
      <button class="btn-default">Continue</button>
    </form>
    <form v-else class="form-body-fin w-full flex flex-col gap-10" @submit.prevent="onFormFinalize">
      <input
        type="text"
        v-model="user.email"
        placeholder="Email"
        class="rounded-lg indent-2 bg-blue"
        :class="emailErrorClasses"
        @keyup="formErrors.email = false" />
      <input
        type="password"
        v-model="user.password"
        placeholder="Password"
        class="rounded-lg indent-2 bg-blue"
        :class="passwordErrorClasses"
        @keyup="formErrors.password = false" />
      <input
        type="password"
        v-model="repeatedPassword"
        placeholder="Repeat password"
        class="rounded-lg indent-2 bg-blue" 
        :class="repeatedPasswordErrorClasses"
        @keyup="formErrors.repeatedPassword = false" />
      <div class="btn-container flex flex-row gap-5 justify-center items-center">
        <button type="button" @click="onFormBack" class="btn-default">Back</button>
        <button type="submit" class="btn-default">Register</button>
      </div>
    </form>
  </div>
</template>
