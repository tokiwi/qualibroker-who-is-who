<template>
  <nuxt-link :to="`/news/${news.id}`" class="flex flex-col md:flex-row md:gap-8 relative">
    <div class="relative w-full md:w-1/3">
      <div class="sticky top-0 aspect-[1/1]">
        <img :src="img(news.header, { width: 400, height: 400, format: 'jpg' })" alt="image"
             class="h-full w-full object-cover">
      </div>
    </div>
    <div class="p-4 flex flex-col gap-2 grow w-full md:w-2/3 bg-white rounded-b-xl md:rounded-xl">
      <div class="flex justify-between items-start mb-4">
        <template v-if="news.category">
          <!-- pill -->
          <div
              class="inline-block py-1 px-2 text-sm text-white font-bold whitespace-nowrap text-ellipsis overflow-hidden"
              :style="`background-color: ${news.category.color};`">
            {{ news.category.name }}
          </div>
        </template>
      </div>
      <div class="text-4xl">
        {{ news.title }}
      </div>
      <template v-if="news.description">
        <div class="text-gray-600 html-content line-clamp-6	md:line-clamp-none" v-html="news.description">
        </div>
      </template>
      <hr class="mt-auto">
      <div v-if="news.date">
        {{ $dayjs(news.date).format('D MMMM YYYY HH:mm') }}
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
