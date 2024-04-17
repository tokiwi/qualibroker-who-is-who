<template>
  <div class="flex flex-wrap gap-2">
    <USelectMenu multiple searchable class="w-full" searchable-placeholder="Chercher une langue" v-model="competences" :options="fetchedCompetences">
      <template #label>
        <span v-if="competences.length" class="truncate">{{ competences.length }} sélectionné(s)</span>
        <span v-else>Competences</span>
      </template>
    </USelectMenu>
    <template v-for="competence in competences">
      <div class="border-black border rounded-full px-2 py-1 flex items-center gap-1">
        <span>{{ competence }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useDirectus} from "~/composables/useDirectus";
import {readItems} from "@directus/sdk";

export default defineComponent({
  name: "competences-list",
  props: {
    modelValue: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      fetchedCompetences: [],
    }
  },
  emits: ['update:modelValue'],
  computed: {
    competences: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    async fetch() {
      this.fetchedCompetences = await useDirectus().client.request(readItems('Competences', {
        fields: "*",
        sort: ['name']
      }))
      if(!this.fetchedCompetences) {
        return
      }
      this.fetchedCompetences = this.fetchedCompetences.map((l: any) => {
        return l.name
      })
    },
  },
  mounted() {
    this.fetch()
  }
})
</script>

<style scoped>

</style>
