<template>
  <div class="flex flex-col gap-5 pt-10">
    <Navigation></Navigation>
    <div class="max-w-screen-md mx-auto bg-white" v-if="news">
      <div class="aspect-video relative">
        <img :src="img(news.header, { width: 768, format: 'jpg' })" alt="image" class="w-full object-cover">
      </div>
      <div class="px-4 py-6 space-y-4">
        <div class="text-5xl">
          {{ news.title }}
        </div>
        <div class="text-2xl">
          {{ news.description }}
        </div>
        <template v-if="news.text">
          <div v-html="news.text"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "[id].vue",
  data() {
    return {
      news: null,
    }
  },
  async mounted() {
    const route = useRoute()
    const {getItemById} = useDirectusItems();

    const news = await getItemById({
      collection: "News",
      id: route.params.id,
      params: {
        fields: ["*"],
      }
    })

    this.news = news
  },
  async setup() {
    const {getThumbnail: img} = useDirectusFiles();

    return {
      img,
    }
  },
})
</script>

<style scoped>

</style>
