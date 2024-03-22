<script setup lang="ts">
import {useAuth} from "../.nuxt/imports";

const refresh = () => {
  const {client} = useDirectus();

  client.refresh();
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <NuxtLink
        :to="`${useRuntimeConfig().public.directusUrl}/auth/login/microsoft?redirect=https://test.meet.qualibroker-swissriskcare.com/login`">
      <div
          class="ring ring-2 ring-inset ring-white hover:ring-inter-primary-500 transition bg-primary-900 hover:bg-inter-primary-500 flex gap-4 items-center text-white px-12 py-6 text-2xl justify-center rounded-xl text-inter-primary-500 hover:text-primary-950">
        <i class="fa fal fa-key"></i>
        Microsoft Login
      </div>
    </NuxtLink>
    <button @click="refresh">
      Refresh
    </button>

    {{useAuth().user}}
  </div>
</template>

<style scoped>

</style>
