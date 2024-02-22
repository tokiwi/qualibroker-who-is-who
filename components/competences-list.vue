<template>
  <div class="flex flex-wrap gap-2">
    <template v-if="editMode">
      <UInput v-model="newCompetence" @keyup.enter.prevent="addToArray(newCompetence)" class="w-40"
              placeholder="Ajouter une compétence"/>
      <div class="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center" @click="addToArray(newCompetence)">
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
    <template v-for="competence in competences">
      <div class="border-black border rounded-full px-2 py-1 flex items-center gap-1">
        <span>{{ competence }}</span>
        <UIcon @click="removeFromArray(competence)" class="cursor-pointer text-lg" name="i-heroicons-x-mark"/>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

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
      editMode: false,
      newCompetence: ''
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
    switchEditMode() {
      this.editMode = !this.editMode
      this.newCompetence = ''
    },
    removeFromArray(competence: string) {
      this.competences = this.competences.filter((c: string) => c !== competence)
    },
    addToArray(competence: string) {
      // if already in array, do nothing
      if (this.competences.includes(competence)) {
        this.newCompetence = ''
        return
      }
      this.competences = [...this.competences, competence]
      this.newCompetence = ''
    }
  }
})
</script>

<style scoped>

</style>
