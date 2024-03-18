<template>
  <div class="min-h-dvh bg-brand-gray px-4 py-6 xl:px-11 xl:py-6 flex flex-col">
    <div class="flex justify-between gap-14">
      <nuxt-link to="/" class="flex flex-col shrink">
        <div class="font-bold text-xl lg:text-4xl whitespace-nowrap">Meet</div>
        <img src="~/assets/images/logo.png" class="w-[140px] lg-w-[230px]" alt="">
      </nuxt-link>
      <client-only>
      <template v-if="useDirectusUser().value">
        <UPopover>
          <div class="flex gap-1 md:gap-3 items-center">
            <template v-if="useDirectusUser().value?.avatar">
              <img :src="img(useDirectusUser().value?.avatar, { width: 60, format: 'jpg' })" alt=""
                   class="hidden md:flex aspect-square rounded-full h-11 w-11">
            </template>
            <template v-else-if="useDirectusUser().value?.first_name && useDirectusUser().value?.last_name">
              <div class="hidden md:flex aspect-square rounded-full h-11 w-11 bg-qualibroker-800 flex items-center justify-center">
                <div class="text-white">
                  {{ useDirectusUser().value.first_name.charAt(0).toUpperCase() }}{{ useDirectusUser().value.last_name.charAt(0).toUpperCase() }}
                </div>
              </div>
            </template>
            <div class="flex flex-col overflow-hidden overflow-ellipsis whitespace-nowrap">
              <div class="text-sm text-gray-400">Profil</div>
              <template v-if="useDirectusUser().value?.first_name && useDirectusUser().value?.last_name">
              <div class="font-bold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[120px]">
                {{ useDirectusUser().value.first_name }} {{useDirectusUser().value.last_name }}
              </div>
              </template>
            </div>
            <div class="shrink-0">
              <UIcon name="i-heroicons-chevron-down" class="text-black"/>
            </div>
          </div>
          <template #panel>
            <div class="p-4">
              <UButton variant="ghost" @click="logoff">
                Se déconnecter
              </UButton>
            </div>
          </template>
        </UPopover>
      </template>
      </client-only>
    </div>
    <NuxtPage></NuxtPage>
    <UNotifications/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'default',
  setup() {
    const { getThumbnail: img } = useDirectusFiles();
    return { img }
  },
  methods: {
    async logoff() {
      await useDirectusAuth().logout();
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

</style>
