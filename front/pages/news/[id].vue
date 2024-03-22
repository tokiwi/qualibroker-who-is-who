<template>
  <div class="flex flex-col gap-5 pt-10">
    <Navigation></Navigation>
    <template v-if="news">
      <div class="w-full max-w-screen-xl mx-auto bg-white pb-7">
        <template v-if="news.header">
          <div class="aspect-[10/5] relative">
            <img :src="img(news.header, { width: 1024, format: 'jpg' })" alt="image"
                 class="w-full object-cover h-full object-center absolute inset-0">
          </div>
        </template>
        <div class="grid grid-cols-12 gap-4 px-4 py-6">
          <div class="col-span-2 relative">
            <div class="flex flex-col gap-4 items-center text-center">
              <template v-if="news.author">
                <div>
                  <div class="text-xl mb-2">
                    Auteur
                  </div>
                  <div class="space-y-4">
                    <NewsPerson :person-id="news.author.id" @click="selectedPerson = news.author.id"></NewsPerson>
                  </div>
                </div>
              </template>
              <template v-if="news.author && news.users && news.users.length > 0">
                <hr class="border-t border-gray-400 w-[50%]">
              </template>
              <template v-if="news.users && news.users.length > 0">
                <div>
                  <div class="text-xl mb-2">
                    Mentionné
                  </div>
                  <div class="space-y-4">
                    <template v-for="user in news.users">
                      <NewsPerson small :person-id="user.directus_users_id"
                                  @click="selectedPerson = user.directus_users_id"></NewsPerson>
                    </template>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="col-span-6 col-start-4 space-y-4">
            <template v-if="news.title">
              <h1 class="text-5xl font-bold">
                {{ news.title }}
              </h1>
            </template>
            <template v-if="news.description">
              <h2 class="text-base">
                {{ news.description }}
              </h2>
            </template>
            <template v-if="news.text">
              <div v-html="news.text" class="html-content"></div>
            </template>
          </div>
        </div>
      </div>
    </template>
    <template v-if="selectedPerson">
      <ModalDetail v-model:person="selectedPerson"/>
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import NewsPerson from "~/components/news/NewsPerson.vue";

export default defineComponent({
  name: "[id].vue",
  components: {NewsPerson},
  data() {
    return {
      news: null,
      selectedPerson: null,
    }
  },
  async mounted() {
    const route = useRoute()
    const {getItemById} = useDirectusItems();

    const news = await getItemById({
      collection: "News",
      id: route.params.id,
      params: {
        fields: [
          "*",
          "category.*",
          "author.id",
          "author.first_name",
          "author.last_name",
          "author.avatar.id",
          "author.title",
          "users.*",
        ],
      }
    })

    this.news = news
  },
  async setup() {
    useHead({
      title: 'Actualité',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Actualité'
        }
      ]
    });

    /*const {getThumbnail: img} = useDirectusFiles();*/

    return {
      img,
    }
  },
})
</script>

<style scoped>

</style>
