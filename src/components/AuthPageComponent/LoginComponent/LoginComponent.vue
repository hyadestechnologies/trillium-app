<script setup lang="ts">
import { reactive, inject, computed } from 'vue';
import { usernameValidation, passwordValidation } from '@/shared/functions/Validation';

const axios: any = inject('axios');

interface LoginUser {
  username: string;
  password: string;
}
interface LoginFormErrors {
  username: boolean;
  password: boolean;
}

const user: LoginUser = reactive({
  username: '',
  password: '',
});
let formErrors: LoginFormErrors = reactive({
  username: false,
  password: false,
});
const errorClasses = {
  'border-red-600': true,
  'border-2': true,
};
let timer: number | undefined = undefined;

function onFormSubmit() {
  // Set error if fields are empty
  if (!user.username) formErrors.username = true;
  if (!user.password) formErrors.password = true;

  if (!formErrors.username && !formErrors.password) {
    authenticate();
  }
}

function startValidation(validator: (arg: string) => boolean, arg: string) {
  return new Promise(resolve => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    timer = setTimeout(() => {
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
function authenticate() {
  axios
    .post('/auth/login/', {
      username: user.username,
      password: user.password,
    })
    .then((response: any) => {
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error);
    });
}

const usernameErrorClasses = computed(() => (formErrors.username ? errorClasses : {}));
const passwordErrorClasses = computed(() => (formErrors.password ? errorClasses : {}));
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
