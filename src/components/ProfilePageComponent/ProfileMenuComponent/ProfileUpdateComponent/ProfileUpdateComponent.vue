<script setup lang="ts">
import router from '@/router';
import { getUserInfo, setUserInfo } from '@/shared/functions/UserInfo';
import { getAuthToken } from '@/shared/functions/request';
import type { User, UserInfo } from '@/shared/types/user';
import { useMutation } from '@tanstack/vue-query';

import { inject, watch } from 'vue';
import { useRoute } from 'vue-router';

const axios: any = inject('axios');
const route = useRoute();

let user: User | null = null;
let userInfo: UserInfo = {
  name: '',
  surname: '',
  username: '',
  email: '',
  description: '',
};

watch(route, initUserInfo);
initUserInfo();
function initUserInfo() {
  user = getUserInfo();
  userInfo.name = user !== null && user.name !== undefined ? user.name : '';
  userInfo.surname = user !== null && user.surname !== undefined ? user.surname : '';
  userInfo.username = user !== null ? user.username : '';
  userInfo.email = user !== null && user.email !== undefined ? user.email : '';
  userInfo.description = user !== null && user.description !== undefined ? user.description : '';
}

const fetcher = async () => {
  if (user === null || user.id === undefined) {
    Promise.reject('Cannot get user ID');
    return;
  }
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getAuthToken();
  return axios
    .put(`/users/profile/update`, {
      name: userInfo.name,
      surname: userInfo.surname,
      username: userInfo.username,
      email: userInfo.email,
      description: userInfo.description,
    })
    .then((response: any) => {
      if (!isError.value) updateUserInfo();
    })
    .catch((error: any) => {
      console.log(error);
    });
};
const { isLoading, isError, error, mutate } = useMutation({ mutationFn: fetcher });

function updateProfile() {
  mutate();
}
async function updateUserInfo() {
  // Update user info
  user = getUserInfo();
  if (user !== null) {
    user.name = userInfo.name;
    user.surname = userInfo.surname;
    user.username = userInfo.username;
    user.email = userInfo.email;
    user.description = userInfo.description;
  } else
    user = {
      password: '',
      name: userInfo.name,
      surname: userInfo.surname,
      username: userInfo.username,
      email: userInfo.email,
      description: userInfo.description,
    };

  setUserInfo(user);
  router.push({ path: '/profile/visualizeprofile' });
}
</script>

<template>
  <div class="flex flex-col p-3">
    <div class="form-item">
      <label for="name" class="pr-2">Name</label>
      <input type="text" id="name" class="w-[70%] px-1 text-black" :disabled="isLoading" v-model="userInfo.name" />
    </div>

    <div class="form-item">
      <label for="surname" class="pr-2">Surname</label>
      <input
        type="text"
        id="surname"
        class="w-[70%] px-1 text-black"
        placeholder="Name"
        :disabled="isLoading"
        v-model="userInfo.surname" />
    </div>

    <div class="form-item">
      <label for="username" class="pr-2">Username</label>
      <input
        type="text"
        id="username"
        class="w-[70%] px-1 text-black"
        placeholder="Surname"
        :disabled="isLoading"
        v-model="userInfo.username" />
    </div>

    <div class="form-item">
      <label for="email" class="pr-2">Email</label>
      <input
        type="email"
        id="email"
        class="w-[70%] px-1 text-black"
        placeholder="Username"
        :disabled="isLoading"
        v-model="userInfo.email" />
    </div>

    <div class="form-item">
      <label for="description" class="pr-2">Description</label>
      <textarea
        name="description"
        id="description"
        rows="5"
        class="w-[70%] px-1 text-black"
        placeholder="Description"
        :disabled="isLoading"
        v-model="userInfo.description"></textarea>
    </div>

    <div class="form-item" v-if="isError">
      <span>Error: Could not update profile info</span>
    </div>

    <div class="flex mt-3 align-center justify-end">
      <button class="btn-default mx-2" @click="updateProfile" v-if="!isLoading">Save</button>
      <button class="btn-default mx-2" :disabled="true" v-else>Saving...</button>
      <button class="btn-default mx-2" :disabled="isLoading" @click="router.back()">Cancel</button>
    </div>
  </div>
</template>

<style scoped>
.form-item {
  display: flex;
  align-items: flex-start;
  margin: 0.5rem;
  justify-content: space-between;
}
</style>
