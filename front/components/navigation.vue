<script lang="ts">
import {defineComponent} from 'vue'
import {readItems} from "@directus/sdk";

export default defineComponent({
  name: "navigation",
  mounted() {
    this.fetchNavigations();
  },
  watch: {
    // watch for route change
    $route() {
      this.fetchNavigations();
    }
  },
  data() {
    return {
      navigations: [],
    }
  },
  computed: {
    horizontalNavigation() {
      return this.navigations.map(navigation => {
        return {
          label: navigation.name,
          to: navigation.link,
          icon: navigation.icon
        }
      })
    }
  },
  methods: {
    async fetchNavigations() {
      this.navigations = await useDirectus().client.request(readItems('navigations', ["*"]));
      /*const {getItems} = useDirectusItems();
      try {
        this.navigations = await getItems({
          collection: "navigations",
          params: {
            fields: "*"
          }
        });
      } catch (e) {
        console.error(e);
      } finally {
      }*/
    },
  },
})
</script>

<template>
  <UHorizontalNavigation :links="horizontalNavigation">
    <template #icon="{link, isActive}">
      <UIcon :name="link.icon" dynamic class="text-xl relative" :class="isActive ? 'text-qualibroker-800 hover:text-black' : ''" />
    </template>
  </UHorizontalNavigation>
</template>

<style scoped>

</style>
