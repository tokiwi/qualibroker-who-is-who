<template>
  <div class="w-full h-dvh grid grid-cols-12">
    <div class="col-span-2 md:col-span-4 xl:col-span-2 h-dvh bg-white flex flex-col gap-32 px-4 py-6 xl:px-11 xl:py-12">
      <nuxt-link to="/">
        <img src="~/assets/images/logo.png" alt="">
      </nuxt-link>
      <nav class="flex flex-col gap-3 text-lg font-medium">
        <template v-for="navigation in navigations" :key="navigation.title">
          <nuxt-link :to="navigation.link" class="flex gap-2 items-center">
            <div class="text-brand-gray text-2xl flex items-center justify-center">
              <UIcon :name="navigation.icon" dynamic />
            </div>
            <div>
              {{ navigation.name }}
            </div>
          </nuxt-link>
        </template>
      </nav>
      <div class="mt-auto">
        <hr class="border-black">
        <div class="text-lg text-gray-600 text-center pt-3">
          <a href="https://tokiwi.ch/" target="_blank">
            Created by tokiwi
          </a>
        </div>
      </div>
    </div>
    <div class="col-span-10 md:col-span-8 xl:col-span-10 h-dvh bg-brand-gray px-4 py-6 xl:px-11 xl:py-12">
      <div class="h-full w-full overflow-scroll">
        <NuxtPage></NuxtPage>
      </div>
    </div>
    <UNotifications />
  </div>
</template>

<script lang="ts">
export default {
  mounted() {
    this.fetchNavigations();
  },
  watch: {
    // watch for route change
    $route() {
      this.fetchNavigations();
    }
  },
  data() {
    return {
      navigations: [],
    }
  },
  methods: {
    async fetchNavigations() {
      const {getItems} = useDirectusItems();
      try {
        this.navigations = await getItems({
          collection: "navigations",
          params: {
            fields: "*"
          }
        });
      } catch (e) {
        console.error(e);
      } finally {
      }
    },
  },
}
</script>

<style scoped>

</style>
