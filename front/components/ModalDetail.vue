<template>
  <UModal v-model="open">
    <UCard v-if="selectedPerson">
      <template #header>
        <div class="flex gap-4">
          <div class="w-14 h-14 shrink-0">
            <img :src="img(selectedPerson.avatar, { width: 100, format: 'jpg' })" alt=""
                 class="w-14 h-14 rounded-full">
          </div>
          <div>
            <div class="text-xl">
              {{ selectedPerson?.first_name }} {{ selectedPerson?.last_name}}
            </div>
            <div>
              {{ selectedPerson?.title || '-' }}
            </div>
          </div>
          <UIcon name="i-heroicons-x-mark" @click="open = false" class="ml-auto text-xl cursor-pointer p-2"/>
        </div>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
        <div class="flex flex-col">
          <div class="font-light text-sm">
            Email
          </div>
          <div class="font-medium">
            <a :href="`mailto:${selectedPerson?.email}`">{{ selectedPerson?.email || '-' }}</a>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="font-light text-sm">
            Téléphone
          </div>
          <div class="font-medium">
            <a :href="`tel:${selectedPerson?.phone}`">{{ selectedPerson?.phone || '-' }}</a>
          </div>
        </div>
        <div class="flex flex-col">
          <AvailabilityList :availabilities="selectedPerson?.availability"></AvailabilityList>
        </div>
        <div class="flex flex-col">
          <div class="font-light text-sm">
            Horaires
          </div>
          <div class="font-medium">
            {{ formatScheduleToHuman(selectedPerson?.schedule_start) }} -
            {{ formatScheduleToHuman(selectedPerson?.schedule_end) }}
          </div>
        </div>
        <div class="flex flex-col">
          <div class="font-light text-sm">
            Departement
          </div>
          <div class="font-medium">
            {{ selectedPerson?.departement?.name || '-' }}
          </div>
        </div>
        <div class="flex flex-col">
          <div class="font-light text-sm">
            Batiment
          </div>
          <div class="font-medium">
            {{ selectedPerson?.batiment?.name || '-' }}
          </div>
        </div>
        <div class="flex flex-col">
          <div class="font-light text-sm">
            Référent
          </div>
          <div class="font-medium">
            <template v-if="selectedPerson.referrer && selectedPerson.referrer.first_name">
              <div class="text-qualibroker-600 cursor-pointer"
                   @click="localPerson = selectedPerson.referrer.id">
                {{ selectedPerson.referrer.first_name }} {{ selectedPerson.referrer.last_name }}
              </div>
            </template>
            <template v-else>
              -
            </template>
          </div>
        </div>
        <div class="col-span-1 md:col-span-2">
          <div class="font-light text-sm">
            Compétences
          </div>
          <div class="font-medium">
            {{ localPerson?.competences?.join(', ') || '-' }}
          </div>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ModalDetail",
  props: {
    person: {
      type: String,
      required: true,
    },
  },
  emits: ['update:open', 'update:person'],
  computed: {
    localPerson: {
      get() {
        return this.person;
      },
      set(value) {
        this.$emit('update:person', value);
      }
    },
  },
  watch: {
    person: {
      immediate: true,
      handler(value) {
        if(value) {
          this.open = true
        }
        this.fetchPerson()
      }
    },
    open: {
      immediate: true,
      handler(value) {
        if (!value) {
          this.$emit('update:person', null);
        }
      }
    }
  },
  data() {
    return {
      selectedPerson: null as any,
      open: false as boolean,
    }
  },
  /*setup() {
    const {getThumbnail: img} = useDirectusFiles();
    return {img}
  },*/
  methods: {
    async fetchPerson() {
      if (!this.person) return;
      /*const {getUserById} = useDirectusUsers();
      const person = await getUserById({
        id: this.person,
        params: {
          fields: ['*', 'referrer.*', 'batiment.*', 'departement.*']
        }
      });*/
      /*this.selectedPerson = person;*/
    },
    formatScheduleToHuman(schedule) {
      // format xx:xx:xx to xxhxx
      if (!schedule) return '';
      return schedule.split(':').slice(0, 2).join('h');
    },
  }
})
</script>

<style scoped>

</style>
