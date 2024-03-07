<template>
  <div class="flex flex-col gap-5 pt-10">
    <Navigation></Navigation>
    <div class="max-w-screen-md mx-auto bg-white">
      <div class="aspect-video relative">
        <img :src="img(news.header, { width: 768, format: 'jpg' })" alt="image" class="w-full object-cover">
      </div>
      <div class="px-4 py-6">
        {{ news }}
        <div class="text-5xl">
          {{ news.title }}
        </div>
        <div class="text-2xl">
          {{ news.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "[id].vue",
  async setup() {
    const route = useRoute()
    console.log(route.params.id)
    const {getItemById} = useDirectusItems();

    const news = await getItemById({
      collection: "News",
      id: route.params.id,
      params: {
        fields: ["*"],
      }
    })

    const {getThumbnail: img} = useDirectusFiles();

    return {
      news,
      img
    }
  },
})
</script>

<style scoped>

</style>
