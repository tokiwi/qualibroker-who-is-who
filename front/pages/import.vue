<template>
  <div class="flex flex-col gap-5 pt-10">
    <Navigation></Navigation>
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

<script lang="ts" setup>

import {definePageMeta} from "#imports";

definePageMeta({
  middleware: ['auth'],
});

useHead({
  title: 'Importation de données',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Importation'
    }
  ]
});

</script>

<script lang="ts">
import {defineComponent} from 'vue'
import {useImport} from "~/composables/useImport";

const users = ref();
export default defineComponent({
  name: "import",
  methods: {
    async importFile(event: any) {
      const file = this.$refs.file.files?.[0];
      this.users = await useImport().xlsxToJson(file);

      // add to each user the role "user" by default
      this.users = this.users.map((user: any) => {
        user.role = '395d2f2a-f75e-432a-b24f-492dae7a713e';
        return user;
      });

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
