<template>
  <UModal v-model="open">
    <UCard v-if="selectedPerson" :ui="{body: {padding: 'p-3 sm:p-3'}}">
      <template #header>
        <div class="flex gap-4">
          <div class="w-14 h-14 shrink-0">
            <img :src="img(selectedPerson.avatar, { width: 100, format: 'jpg' })" alt=""
                 class="w-14 h-14 rounded-full">
          </div>
          <div>
            <div class="text-xl">
              {{ selectedPerson?.first_name }} {{ selectedPerson?.last_name }}
            </div>
            <div>
              {{ selectedPerson?.title || '-' }}
            </div>
          </div>
          <UIcon name="i-heroicons-x-mark" @click="open = false" class="ml-auto text-xl cursor-pointer p-2"/>
        </div>
      </template>
      <div class="flex flex-col gap-3">
        <div class="flex flex-col rounded-xl border">
          <div class="text-lg text-gray-600 px-2.5 py-1.5 border-b">
            Contact
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 px-2.5 py-2">
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
                <a :href="`tel:${selectedPerson?.phone}`" class="flex gap-1 items-center">
                  <Icon dynamic name="i-material-symbols-call"></Icon>
                  <div>{{ selectedPerson?.phone || '-' }}</div>
                </a>
                <a :href="`tel:${selectedPerson?.phone_mobile}`" class="flex gap-1 items-center">
                  <Icon dynamic name="i-material-symbols-phone-android-outline"></Icon>
                  <div>{{ selectedPerson?.phone_mobile || '-' }}</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col rounded-xl border">
          <div class="text-lg text-gray-600 px-2.5 py-1.5 border-b">
            Disponibilité
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 px-2.5 py-2">
            <div class="flex flex-col" v-if="selectedPerson?.availability">
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
          </div>
        </div>
        <div class="flex flex-col rounded-xl border">
          <div class="text-lg text-gray-600 px-2.5 py-1.5 border-b">
            Skills
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 px-2.5 py-2">
            <div class="col-span-1">
              <div class="font-light text-sm">
                Compétences
              </div>
              <div class="font-medium">
                {{ selectedPerson?.competences?.join(', ') || '-' }}
              </div>
            </div>
            <div class="col-span-1">
              <div class="font-light text-sm">
                Langues
              </div>
              <div class="font-medium">
                {{ selectedPerson?.languages?.join(', ') || '-' }}
              </div>
            </div>
            <div class="col-span-1">
              <div class="font-light text-sm">
                Activité principale
              </div>
              <div class="font-medium">
                {{ selectedPerson?.activities?.name || '-' }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col rounded-xl border">
          <div class="text-lg text-gray-600 px-2.5 py-1.5 border-b">
            Général
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 px-2.5 py-2">
            <div class="flex flex-col">
              <div class="font-light text-sm">
                Lieu de travail
              </div>
              <div class="font-medium">
                {{ selectedPerson?.workplace?.name || '-' }}
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
            <template v-if="selectedPerson?.linkedin">
              <div class="col-span-1 md:col-span-2">
                <div class="font-light text-sm">
                  Réseau sociaux
                </div>
                <div class="font-medium flex items-center gap-2">
                  <a :href="selectedPerson?.linkedin" target="_blank">
                    <Icon dynamic name="i-bxl-linkedin" class="text-xl"></Icon>
                  </a>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {readUser} from "@directus/sdk";
import img from "~/mixins/images";

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
        if (value) {
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
  mixins: [
    img,
  ],
  methods: {
    async fetchPerson() {
      if (!this.person) return;

      this.selectedPerson = await useDirectus().client.request(readUser(this.person, {
        fields: ['*', 'referrer.*', 'batiment.*', 'departement.*', 'workplace.*', 'activities.*']
      }))

      if(this.selectedPerson?.availabilities) {
        this.selectedPerson.availabilities = []
      }
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
