<script lang="ts" setup>
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { reactive, inject, computed } from 'vue';
import { usernameValidation, passwordValidation } from '@/shared/functions/Validation';
import { getAuthToken, setAuthToken } from '@/shared/functions/request';
import router from '@/router';

import type { User } from '@/shared/types/user';
import type { FormErrors, Response } from './LoginComponentType';
import { setUserInfo } from '@/shared/functions/UserInfo';
import type { AxiosInstance } from 'axios';

const axios: AxiosInstance | undefined = inject('axios');

axios?.interceptors.request.use(
  config => {
    const token = getAuthToken();
    if (token || config !== undefined) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const user: User = reactive({
  username: '',
  password: '',
});

const formErrors: FormErrors = reactive({
  username: false,
  password: false,
});

const errorClasses = {
  'border-light-red': true,
  'border-2': true,
};
let timer: number | undefined = undefined;

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

function onFormSubmit() {
  // Set error if fields are empty
  if (!user.username) formErrors.username = true;
  if (!user.password) formErrors.password = true;

  if (!formErrors.username && !formErrors.password) {
    // Refetch login query
    loginQuery
      .refetch()
      .then(() => {
        const response = loginQuery.data.value;
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
      });
  }
}

function startValidation(validator: (arg: string) => boolean, arg: string) {
  return new Promise(resolve => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    timer = window.setTimeout(() => {
      resolve(validator(arg));
    }, 200);
  });
}
// Show errors based on username validation
async function checkUsername() {
  formErrors.username = !(await startValidation(usernameValidation, user.username));
}
// Show errors based on password validation
async function checkPassword() {
  formErrors.password = !(await startValidation(passwordValidation, user.password));
}

const usernameErrorClasses = computed(() => (formErrors.username ? errorClasses : {}));
const passwordErrorClasses = computed(() => (formErrors.password ? errorClasses : {}));
</script>

<template>
  <div class="flex flex-col mt-5 p-5">
    <div class="form-header mb-5">
      <h1 class="text-center text-2xl">Insert your credentials</h1>
    </div>
    <form class="form-body flex flex-col gap-10" @submit.prevent="onFormSubmit">
      <input
        type="text"
        v-model="user.username"
        placeholder="Username"
        class="rounded-lg indent-2 bg-blue"
        :class="usernameErrorClasses"
        @keyup="checkUsername()" />
      <input
        type="password"
        v-model="user.password"
        placeholder="Password"
        class="rounded-lg indent-2 bg-blue"
        :class="passwordErrorClasses"
        @keyup="checkPassword()" />

      <button type="submit" class="btn-default">Login</button>
    </form>
  </div>
</template>
