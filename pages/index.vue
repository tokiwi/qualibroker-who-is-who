<template>
  <div class="flex flex-col gap-5">
    <div class="font-bold text-5xl">Who is who ?</div>
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
        <div class="w-11 h-11 mx-auto">
          <img :src="img(row.image, { width: 60, format: 'jpg' })" alt="" class="aspect-square rounded-full">
        </div>
      </template>
      <template #name-data="{ row }">
        <div class="flex flex-col w-[150px]">
          <div class="font-medium overflow-hidden whitespace-nowrap overflow-ellipsis">
            {{ row.name }}
          </div>
          <div class="font-light overflow-hidden whitespace-nowrap overflow-ellipsis ">
            {{ row.title }}
          </div>
        </div>
      </template>
      <template #departement-data="{row}">
        {{ row.departement }}
      </template>
      <template #email-data="{ row }">
        <a :href="`mailto:${row.email}`">{{ row.email }}</a>
      </template>
      <template #phone-data="{row}">
        <a :href="`tel:${row.phone}`">{{ row.phone }}</a>
      </template>
      <template #schedules-data="{row}">
        {{ formatScheduleToHuman(row.schedule_start) }} - {{ formatScheduleToHuman(row.schedule_end) }}
      </template>
      <template #disponibility-data="{row}">
        <AvailabilityList :availabilities="row.availability"></AvailabilityList>
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
              <img :src="img(getSelectedPerson.image, { width: 100, format: 'jpg' })" alt="" class="aspect-square rounded-full">
            </div>
            <div>
              <div class="text-xl">
                {{ getSelectedPerson?.name || '-' }}
              </div>
              <div>
                {{ getSelectedPerson?.title || '-' }}
              </div>
            </div>
          </div>
        </template>
        <div class="grid grid-cols-2 gap-y-6 gap-x-4">
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
              {{ getSelectedPerson?.departement || '-' }}
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
              <template v-if="getSelectedPerson.referrer && getSelectedPerson.referrer.name">
                <div class="text-qualibroker-600 cursor-pointer"
                     @click="selectedPerson = getSelectedPerson.referrer.id">
                  {{ getSelectedPerson.referrer.name }}
                </div>
              </template>
              <template v-else>
                -
              </template>
            </div>
          </div>
          <div class="col-span-2">
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

<script lang="ts">
import AvailabilityList from "~/components/availability-list.vue";

definePageMeta({
  middleware: ["auth"]
})
export default {
  components: {AvailabilityList},
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
          key: 'name',
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
  mounted() {
    this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      this.loading = true;
      const {getItems} = useDirectusItems();
      try {
        this.peoples = await getItems({
          collection: "Employees",
          params: {
            fields: "*, departement.*, referrer.*, batiment.*"
          }
        });
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
        if (typeof person.departement === 'object') {
          person.departement = person.departement.name;
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
