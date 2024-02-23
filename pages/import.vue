<template>
  <div>
    <h1>import</h1>
    <div class="flex flex-col">
      <div class="flex gap-2">
        <input type="file" ref="file">
        <UButton @click="importFile">Importer</UButton>
      </div>
      <div>
        <UButton color="gray" @click="downloadExampleFile">Télécharger un fichier d'exemple</UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useImport} from "~/composables/useImport";

export default defineComponent({
  name: "import",
  methods: {
    importFile(event: any) {
      const file = this.$refs.file.files[0];
      useImport().importFile(file);
    },
    downloadExampleFile() {
      const result = useImport().exampleFile();
      const blob = new Blob([result], {type: 'text/csv'});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'exemple.csv';
      a.click();
    }
  }
})
</script>

<style scoped>

</style>
