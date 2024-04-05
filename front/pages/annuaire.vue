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
          <template v-else>
            <Icon name="i-heroicons-user-circle" class="text-gray-400 h-full w-full"/>
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
      <template #readableWorkplace-data="{row}">
          {{ row.readableWorkplace }}
      </template>
      <template #readableDepartement-data="{row}">
        {{row.readableDepartement}}
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
        <template v-if="row.phone || row.phone_mobile">
        <template v-if="row.phone">
          <a :href="`tel:${row.phone}`" class="flex gap-1 items-center">
            <Icon dynamic name="i-material-symbols-call"></Icon>
            <div>{{ row.phone }}</div>
          </a>
        </template>
        <template v-if="row.phone_mobile">
          <a :href="`tel:${row.phone_mobile}`" class="flex gap-1 items-center">
            <Icon dynamic name="i-material-symbols-phone-android-outline"></Icon>
            <div>{{ row.phone_mobile }}</div>
          </a>
        </template>
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
    <template v-if="selectedPerson">
      <ModalDetail v-model:person="selectedPerson" />
    </template>
  </div>
</template>

<script lang="ts">
import {readUsers} from "@directus/sdk";
import images from "~/mixins/images";

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
          key: 'readableWorkplace',
          label: 'Lieu de travail',
          sortable: true,
        },
        {
          key: 'readableDepartement',
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
  setup() {
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
  },
  mixins: [
    images,
  ],
  methods: {
    async fetchEmployees() {
      this.loading = true;
      this.peoples = await useDirectus().client.request(readUsers({
        fields: "*, departement.*, referrer.*, batiment.*, workplace.*",
        /*filter: {
          role: {
            name: {
              _eq: 'User'
            }
          }
        }*/
      }));
      this.loading = false;
    },
    formatScheduleToHuman(schedule) {
      // format xx:xx:xx to xxhxx
      if (!schedule) return '';
      return schedule.split(':').slice(0, 2).join('h');
    },
  },
  computed: {
    formatedPeoples() {
      return this.peoples.map(person => {
        return {
          ...person,
          readableName: person?.first_name || person?.last_name ? `${person?.first_name || ''} ${person?.last_name || ''}` : person.email,
          readableWorkplace: `${person?.workplace?.name || '-'}`,
          readableDepartement: `${person?.departement?.name || '-'}`,
        }
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
