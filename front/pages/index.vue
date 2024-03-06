<template>
  <div class="flex flex-col gap-5 pt-10">
    <Navigation></Navigation>
    <div class="flex px-0.5">
      <UInput v-model="q"
              icon="i-heroicons-magnifying-glass-20-solid"
              size="lg"
              color="white"
              :trailing="false"
              placeholder=""
              class="grow"
      />
    </div>
    <UTable :rows="filteredPeoples" :columns="columns" :pending="loading" class="text-brand-text">
      <template #avatar-data="{ row }">
        <div class="w-11 h-11 mx-auto cursor-pointer" @click="selectedPerson = row.id; openModal = true;">
          <template v-if="row.avatar">
            <img :src="img(row.avatar, { width: 60, format: 'jpg' })" alt=""
                 class="aspect-square rounded-full h-full w-full">
          </template>
        </div>
      </template>
      <template #readableName-data="{ row }">
        <div class="flex flex-col w-[150px] cursor-pointer" @click="selectedPerson = row.id; openModal = true;">
          <div class="font-medium overflow-hidden whitespace-nowrap overflow-ellipsis">
            {{ row.readableName }}
          </div>
          <div class="font-light overflow-hidden whitespace-nowrap overflow-ellipsis ">
            {{ row.title }}
          </div>
        </div>
      </template>
      <template #departement-data="{row}">
        <template v-if="row.department">
          {{ row.department }}
        </template>
        <template v-else>
          -
        </template>
      </template>
      <template #email-data="{ row }">
        <template v-if="row.email">
          <a :href="`mailto:${row.email}`">{{ row.email }}</a>
        </template>
        <template v-else>
          -
        </template>
      </template>
      <template #phone-data="{row}">
        <template v-if="row.phone">
          <a :href="`tel:${row.phone}`">{{ row.phone }}</a>
        </template>
        <template v-else>
          -
        </template>
      </template>
      <template #schedules-data="{row}">
        {{ formatScheduleToHuman(row.schedule_start) }} - {{ formatScheduleToHuman(row.schedule_end) }}
      </template>
      <template #disponibility-data="{row}">
        <AvailabilityList :availabilities="row.availability || []"></AvailabilityList>
      </template>
      <template #action-data="{row}">
        <div class="flex gap-2" @click="selectedPerson = row.id; openModal = true;">
          <UButton size="sm" color="gray" variant="ghost" icon="i-heroicons-eye"/>
        </div>
      </template>
      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="italic text-sm">En chargement !</span>
        </div>
      </template>
    </UTable>
    <UModal v-model="openModal">
      <UCard>
        <template #header>
          <div class="flex gap-4">
            <div class="w-14 h-14 shrink-0">
              <img :src="img(getSelectedPerson.avatar, { width: 100, format: 'jpg' })" alt=""
                   class="w-14 h-14 rounded-full">
            </div>
            <div>
              <div class="text-xl">
                {{ getSelectedPerson?.readableName || '-' }}
              </div>
              <div>
                {{ getSelectedPerson?.title || '-' }}
              </div>
            </div>
            <UIcon name="i-heroicons-x-mark" @click="openModal = false" class="ml-auto text-xl cursor-pointer p-2"/>
          </div>
        </template>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
          <div class="flex flex-col">
            <div class="font-light text-sm">
              Email
            </div>
            <div class="font-medium">
              <a :href="`mailto:${getSelectedPerson?.email}`">{{ getSelectedPerson?.email || '-' }}</a>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="font-light text-sm">
              Téléphone
            </div>
            <div class="font-medium">
              <a :href="`tel:${getSelectedPerson?.phone}`">{{ getSelectedPerson?.phone || '-' }}</a>
            </div>
          </div>
          <div class="flex flex-col">
            <AvailabilityList :availabilities="getSelectedPerson?.availability"></AvailabilityList>
          </div>
          <div class="flex flex-col">
            <div class="font-light text-sm">
              Horaires
            </div>
            <div class="font-medium">
              {{ formatScheduleToHuman(getSelectedPerson?.schedule_start) }} -
              {{ formatScheduleToHuman(getSelectedPerson?.schedule_end) }}
            </div>
          </div>
          <div class="flex flex-col">
            <div class="font-light text-sm">
              Departement
            </div>
            <div class="font-medium">
              {{ getSelectedPerson?.department || '-' }}
            </div>
          </div>
          <div class="flex flex-col">
            <div class="font-light text-sm">
              Batiment
            </div>
            <div class="font-medium">
              {{ getSelectedPerson?.batiment?.name || '-' }}
            </div>
          </div>
          <div class="flex flex-col">
            <div class="font-light text-sm">
              Référent
            </div>
            <div class="font-medium">
              <template v-if="getSelectedPerson.referrer && getSelectedPerson.referrer.first_name">
                <div class="text-qualibroker-600 cursor-pointer"
                     @click="selectedPerson = getSelectedPerson.referrer.id">
                  {{ getSelectedPerson.referrer.first_name }} {{ getSelectedPerson.referrer.last_name }}
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
              {{ getSelectedPerson?.competences?.join(', ') || '-' }}
            </div>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import {definePageMeta} from "#imports";

useHead({
  title: 'Annuaire',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Annuaire des collaborateurs'
    }
  ]
});
definePageMeta({
  middleware: ['auth'],
});

</script>

<script lang="ts">
import type {DirectusUserRequest} from "nuxt-directus/dist/runtime/types";
import {definePageMeta} from "#imports";

export default {
  layout: 'default',
  data() {
    return {
      q: '',
      columns: [
        {
          key: 'avatar',
          label: '',
        },
        {
          key: 'readableName',
          label: 'Nom',
          sortable: true,
        },
        {
          key: 'departement',
          label: 'Département',
          sortable: true,
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true,
        },
        {
          key: 'phone',
          label: 'Téléphone',
          sortable: true,
        },
        {
          key: 'disponibility',
          label: 'Disponibilité'
        },
        {
          key: 'schedules',
          label: 'Horaires'
        },
        {
          key: 'action',
          label: 'Action'
        }
      ],
      peoples: [],
      selectedPerson: null,
      openModal: false,
      loading: false,
    }
  },
  async mounted() {
    await this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      this.loading = true;
      const {getUsers} = useDirectusUsers();
      try {
        this.peoples = await getUsers({
          params: {
            fields: "*, department.*, referrer.*, batiment.*"
          }
        } as DirectusUserRequest);
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    img(params) {
      const {getThumbnail} = useDirectusFiles();
      return getThumbnail(params);
    },
    formatScheduleToHuman(schedule) {
      // format xx:xx:xx to xxhxx
      if (!schedule) return '';
      return schedule.split(':').slice(0, 2).join('h');
    },
  },
  computed: {
    getSelectedPerson() {
      return this.peoples.find(person => person.id === this.selectedPerson);
    },
    formatedPeoples() {
      return this.peoples.map(person => {
        if (person.department && typeof person.department === 'object') {
          person.department = person.department.name;
        }
        if (person.first_name || person.last_name) {
          person.readableName = `${person.first_name} ${person.last_name}`;
        }
        return person;
      })
    },
    filteredPeoples() {
      if (!this.q) {
        return this.formatedPeoples
      }
      return this.formatedPeoples.filter((person) => {
        return Object.values(person).some((value) => {
          if (typeof value === 'string') {
            return String(value).toLowerCase().includes(this.q.toLowerCase())
          }
          return false
        })
      })
    }
  }
}


</script>

<style scoped>

</style>
