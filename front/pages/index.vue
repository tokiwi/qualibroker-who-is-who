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
import images from "~/mixins/images";

export default defineComponent({
  name: "me",
  layout: 'default',
  data() {
    return {
      news: [],
    }
  },
  mixins: [
    images,
  ],
  mounted() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      this.news = await useDirectus().client.request(readItems('News', {
        fields: ["title", "header", "description", "id", "category.*", "date"]
      }));
    },
  }
})
</script>

<style scoped>

</style>
