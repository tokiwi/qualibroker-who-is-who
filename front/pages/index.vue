<template>
  <div class="flex flex-col gap-5 pt-10">
    <Navigation></Navigation>
    <div class="flex flex-col gap-16 w-full max-w-[960px] mx-auto">
      <template v-for="_new in news" :key="_new.id">
        <NewsItem :news="_new" class=""></NewsItem>
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
