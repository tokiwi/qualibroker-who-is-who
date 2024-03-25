<template>
  <div class="cursor-pointer flex flex-col items-center gap-2" v-if="person">
    <template v-if="person?.avatar">
      <div class="shrink-0" :class="classSize">
        <img :src="img(person.avatar, { width: 100, format: 'jpg' })" alt=""
             class="rounded-full"
        :class="classSize">
      </div>
    </template>
    <div class="text-center">
      <div>
        {{ person?.first_name }} {{ person?.last_name }}
      </div>
      <div class="text-sm text-gray-500">
        {{ person?.title || '-' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {readUser} from "@directus/sdk";
import images from "~/mixins/images";

export default defineComponent({
  props: {
    personId: {
      type: String,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      person: null as any,
    }
  },
  name: "NewsPerson",
  async mounted() {
    await this.fetchPerson()
  },
  computed: {
    classSize() {
      if(this.small) {
        return 'w-10 h-10'
      }
      return 'w-20 h-20'
    }
  },
  methods: {
    async fetchPerson() {
      if (!this.personId) return;

      this.person = await useDirectus().client.request(readUser(this.personId));
    },
  },
  mixins: [
      images,
  ]
})
</script>

<style scoped>

</style>
