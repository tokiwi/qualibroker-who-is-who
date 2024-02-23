<template>
  <div>
    <h1>import</h1>
    <div class="flex flex-col">
      <div class="flex gap-2">
        <input type="file" ref="file">
        <UButton @click="importFile">Importer</UButton>
      </div>
      <a href="/exemple.xlsx" download="">
        <UButton color="gray" >Télécharger un fichier d'exemple</UButton>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useImport} from "~/composables/useImport";


const users = ref();
export default defineComponent({
  middleware: ['auth'],
  name: "import",
  methods: {
    async importFile(event: any) {
      const file = this.$refs.file.files?.[0];
      this.users = await useImport().xlsxToJson(file);

      await useDirectusUsers().createUsers({users:this.users});

    },

  },
  data() {
    return {
      users:[]
    }
  }
})
</script>

<style scoped>

</style>
