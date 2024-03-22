<template>
  <div class="flex flex-col gap-5 pt-10">
    <Navigation></Navigation>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <template v-for="_new in news" :key="_new.id">
        <NewsItem :news="_new"></NewsItem>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {definePageMeta} from "#imports";

useHead({
  title: 'Actualités',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Actualités'
    }
  ]
});
</script>

<script lang="ts">
import {defineComponent} from 'vue'
import {readItems} from "@directus/sdk";

export default defineComponent({
  name: "me",
  layout: 'default',
  data() {
    return {
      news: [],
    }
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {

      let items = await useDirectus().client.request(readItems('News', ["title", "header", "description", "id", "category.*", "date"]));

      console.log(items)

      /*const {getItems} = useDirectusItems();
      try {
        this.news = await getItems({
          collection: "News",
          params: {
            fields: ["title", "header", "description", "id", "category.*", "date"],
          }
        });
      } catch (error) {
        console.log(error)
      }*/
    },
  }
})
</script>

<style scoped>

</style>
