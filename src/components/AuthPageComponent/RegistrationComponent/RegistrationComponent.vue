<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        username: '',
      },
      formErrors: {
        firstName: false,
        lastName: false,
        username: false,
      },
    };
  },
  methods: {
    onFormSubmit() {
      // do checks
      if (!this.user.firstName) {
        console.log('first name is not set');
      }

      if (!this.user.lastName) {
        // do something
      }

      if (!this.user.username) {
        // do something
      }

      console.log('form has been submitted');
    },
  },
});
</script>

<template>
  <div class="flex flex-col mt-5 p-5">
    <div class="form-header">
      <h1 class="text-center text-2xl">Tell me who you are!</h1>
    </div>
    <form class="form-body flex flex-col gap-10" @submit.prevent="onFormSubmit">
      <input type="text" v-model="user.firstName" placeholder="First name" class="rounded-lg indent-2" />
      <input type="text" v-model="user.lastName" placeholder="Last name" class="rounded-lg indent-2" />
      <input type="text" v-model="user.username" placeholder="Username" class="rounded-lg indent-2" />
      <button class="btn-default">Continue</button>
    </form>
  </div>
</template>
