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

definePageMeta({
  middleware: ['auth'],
});
</script>

<script lang="ts">
import {defineComponent} from 'vue'
import {useDirectusUsers} from "#imports";

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
      const {getItems} = useDirectusItems();
      try {
        this.news = await getItems({
          collection: "News",
          params: {
            fields: ["title", "header", "description", "id", "category.*", "date"],
          }
        });
      } catch (error) {
        console.log(error)
      }
    },
  }
})
</script>

<style scoped>

</style>
