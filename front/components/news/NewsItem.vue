<template>
  <nuxt-link :to="`/news/${news.id}`" class="bg-white rounded-xl overflow-hidden">
      <div class="aspect-video relative">
        <img :src="img(news.header, { width: 400, format: 'jpg' })" alt="image" class="w-full object-cover">
      </div>
    <div class="p-4 space-y-1">
      <div class="flex justify-between items-start">
        <template v-if="news.category">
          <!-- pill -->
          <div class="inline-block py-1 px-2 text-sm text-white font-bold rounded-full whitespace-nowrap text-ellipsis overflow-hidden"
               :style="`background-color: ${news.category.color};`">
            {{ news.category.name }}
          </div>
        </template>
        <div v-if="news.date">
          {{ $dayjs(news.date).format('D MMMM YYYY') }}
        </div>
      </div>
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
import img from "~/mixins/images";

export default defineComponent({
  name: "NewsItem",
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  mixins: [
      img,
  ]
})
</script>

<style scoped>

</style>
