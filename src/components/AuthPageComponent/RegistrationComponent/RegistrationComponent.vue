<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      user: {
        firstName: '',
        surname: '',
        username: '',
      },
      formErrors: {
        firstName: false,
        surname: false,
        username: false,
      },
      isFormInit: true,
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
        this.formErrors.surname = true;
      }

      if (this.user.firstName && this.user.surname && this.user.username) {
        console.log('form is valid');
        this.isFormInit = false;
      }
    },
    onFormFinalize() {
      // do checks
    },
    onFormBack() {
      this.isFormInit = true;
    },
  },
  computed: {
    formHeader() {
      return this.isFormInit ? 'Tell me who you are!' : 'Finalize creation';
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
      <input type="text" v-model="user.firstName" placeholder="First name" class="rounded-lg indent-2" />
      <input type="text" v-model="user.surname" placeholder="Last name" class="rounded-lg indent-2" />
      <input type="text" v-model="user.username" placeholder="Username" class="rounded-lg indent-2" />
      <button class="btn-default">Continue</button>
    </form>
    <form v-else class="form-body-fin w-full flex flex-col gap-10" @submit.prevent="onFormFinalize">
      <input type="text" placeholder="Email" class="rounded-lg indent-2" />
      <input type="text" placeholder="Password" class="rounded-lg indent-2" />
      <input type="text" placeholder="Repeat password" class="rounded-lg indent-2" />
      <div class="btn-container flex flex-row gap-5">
        <button type="button" @click="onFormBack" class="btn-default">Back</button>
        <button type="submit" class="btn-default">Register</button>
      </div>
    </form>
  </div>
</template>
