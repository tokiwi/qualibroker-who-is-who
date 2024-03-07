<template>
  <nuxt-link :to="`/news/${news.id}`" class="bg-white rounded-xl overflow-hidden">
    <div class="aspect-video relative">
      <img :src="img(news.header, { width: 400, format: 'jpg' })" alt="image" class="w-full object-cover">
    </div>
    <div class="p-4">
      <div class="text-xl">
        {{ news.title }}
      </div>
      <div class="text-gray-600">
        {{ news.description }}
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "NewsItem",
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  setup() {
    const { getThumbnail: img } = useDirectusFiles();
    return { img }
  },
})
</script>

<style scoped>

</style>
