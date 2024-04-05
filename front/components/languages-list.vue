<template>
  <div class="flex flex-wrap gap-2">
    <template v-if="editMode">
      <UInput v-model="newLanguage" @keyup.enter.prevent="addToArray(newLanguage)" class="w-40"
              placeholder="Ajouter une compétence"/>
      <div class="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center" @click="addToArray(newLanguage)">
        <UIcon name="i-heroicons-check" class="text-xl "></UIcon>
      </div>
      <div class="bg-qualibroker-500 text-white w-8 h-8 rounded-full flex items-center justify-center" @click="switchEditMode">
        <UIcon name="i-heroicons-x-mark" class="text-xl"></UIcon>
      </div>
    </template>
    <template v-else>
      <div class="flex items-center justify-center text-white rounded-full gap-1 px-2.5 cursor-pointer bg-qualibroker-500" @click="switchEditMode">
        ajouter
        <UIcon name="i-heroicons-plus" class="text-xl"></UIcon>
      </div>
    </template>
    <template v-for="language in languages">
      <div class="border-black border rounded-full px-2 py-1 flex items-center gap-1">
        <span>{{ language }}</span>
        <UIcon @click="removeFromArray(language)" class="cursor-pointer text-lg" name="i-heroicons-x-mark"/>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "languages-list",
  props: {
    modelValue: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      editMode: false,
      newLanguage: ''
    }
  },
  emits: ['update:modelValue'],
  computed: {
    languages: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    switchEditMode() {
      this.editMode = !this.editMode
      this.newLanguage = ''
    },
    removeFromArray(language: string) {
      this.languages = this.languages.filter((c: string) => c !== language)
    },
    addToArray(language: string) {
      // if already in array, do nothing
      if (this.languages.includes(language)) {
        this.newLanguage = ''
        return
      }
      this.languages = [...this.languages, language]
      this.newLanguage = ''
    }
  }
})
</script>

<style scoped>

</style>
