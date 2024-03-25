<template>
  <div class="flex flex-col gap-5 pt-10">
    <Navigation></Navigation>
    <div class="flex flex-col gap-4">
      <div class="text-3xl font-bold">
        Mon Profil
      </div>
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-11 items-start">
        <div class="xl:col-span-8 p-6 bg-white rounded-xl">
          <UForm @submit="update" @keydown.enter.prevent :state="state" class="grid grid-col-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-6">
              <div class="font-bold text-xl">
                Informations
              </div>
              <div class="flex flex-col gap-3">
                <UFormGroup label="Nom de famille" name="last_name">
                  <UInput v-model="state.last_name"/>
                </UFormGroup>
                <UFormGroup label="Prénom" name="first_name">
                  <UInput v-model="state.first_name"/>
                </UFormGroup>
                <UFormGroup label="Titre" name="title">
                  <UInput v-model="state.title"/>
                </UFormGroup>
                <UFormGroup label="Email" name="email">
                  <UInput v-model="state.email" readonly/>
                </UFormGroup>
                <UFormGroup label="Téléphone" name="phone">
                  <UInput v-model="state.phone"/>
                </UFormGroup>
                <template v-if="batiments">
                  <UFormGroup label="Batiment" name="batiment">
                    <USelectMenu v-model="state.batiment"
                                 searchable
                                 searchable-placeholder="Rechercher un batiment"
                                 value-attribute="id"
                                 option-attribute="name"
                                 :options="batiments"/>
                  </UFormGroup>
                </template>
                <template v-if="departements">
                  <UFormGroup label="Département" name="departement">
                    <USelectMenu v-model="state.departement"
                                 searchable
                                 searchable-placeholder="Rechercher un département"
                                 value-attribute="id"
                                 option-attribute="name"
                                 :options="departements"/>
                  </UFormGroup>
                </template>
                <template v-if="referrers">

                  <UFormGroup label="Référant" name="referrer">
                    <USelectMenu v-model="state.referrer"
                                 searchable
                                 searchable-placeholder="Rechercher un département"
                                 value-attribute="id"
                                 option-attribute="name"
                                 :options="referrers"/>
                  </UFormGroup>
                </template>
              </div>
            </div>
            <div class="flex flex-col gap-6">
              <div class="font-bold text-xl">
                Disponibilités
              </div>
              <UFormGroup label="Jours" name="availability">
                <div class="flex flex-wrap gap-3">
                  <template v-for="day in days" :key="day.label">
                    <div>
                      <UCheckbox color="green" :ui="{'inner': 'ms-1 flex flex-col'}" v-model="state.availability"
                                 :value="day.key" :label="day.label" :name="day.label" :id="day.label"/>
                    </div>
                  </template>
                </div>
              </UFormGroup>
              <div class="flex gap-4">
                <UFormGroup label="Heure de début" name="schedule_start" class="grow">
                  <UInput type="time" v-model="state.schedule_start"/>
                </UFormGroup>
                <UFormGroup label="Heure de fin" name="schedule_end" class="grow">
                  <UInput type="time" v-model="state.schedule_end"/>
                </UFormGroup>
              </div>
              <CompetencesList v-model="state.competences"></CompetencesList>
            </div>
            <div class="col-span-1 md:col-span-2 flex gap-2 justify-end">
              <UButton size="lg" type="submit" class="text-center">Sauvegarder</UButton>
            </div>
          </UForm>
        </div>
        <div class="xl:col-span-4 bg-white rounded-xl">
          <div class="p-6 font-bold text-xl">
            Photo de profil
          </div>
          <template v-if="state && state.avatar">
            <div class="p-6 bg-gray-100 flex items-center justify-center">
              <img :src="img(state.avatar, { width: 300, format: 'jpg' })"
                   class="w-32 h-32 rounded-full outline outline-offset-4 outline-qualibroker-600" alt="">
            </div>
          </template>
          <div class="p-6">
            <div class="flex items-center justify-center">
              <input type="file" class="hidden" ref="input-file" @change="handleUploadFile"/>
              <UButton size="lg" variant="ghost" color="gray" @click="updatePhoto">Changer ma photo de profil</UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'Mon Profil',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Mon Profil'
    }
  ]
});
</script>

<script lang="ts">
import {defineComponent} from 'vue'
import images from "~/mixins/images";
import {useAuth, useDirectus} from "#imports";
import {readAssetRaw, readItems, readUser, readUsers, updateUser, uploadFiles} from "@directus/sdk";

export default defineComponent({
  name: "me",
  layout: 'default',
  data() {
    return {
      days: [
        {
          label: 'Lundi',
          key: 'monday'
        },
        {
          label: 'Mardi',
          key: 'tuesday'
        },
        {
          label: 'Mercredi',
          key: 'wednesday'
        },
        {
          label: 'Jeudi',
          key: 'thursday'
        },
        {
          label: 'Vendredi',
          key: 'friday'
        },
        {
          label: 'Samedi',
          key: 'saturday'
        },
        {
          label: 'Dimanche',
          key: 'sunday'
        }
      ],
      state: {},
      batiments: [],
      departements: [],
      referrers: [],
      file: null,
    }
  },
  mounted() {
    this.fetchState();
    this.fetchBatiments();
    this.fetchDepartements();
    this.fetchReferrers();
  },
  mixins: [
    images,
  ],
  methods: {
    async fetchState() {
      this.state = await useDirectus().client.request(readUser(useAuth().user.id, {
        fields: ['id', 'first_name', 'last_name', 'email', 'avatar', 'location', 'title', 'phone', 'availability', 'schedule_start', 'schedule_end', 'competences', 'departement', 'referrer', 'batiment']
      }));

      if (this.state.availability == null) {
        this.state.availability = [];
      }
      if (this.state.competences == null) {
        this.state.competences = [];
      }
    },
    async fetchBatiments() {
      this.batiments = await useDirectus().client.request(readItems('Batiments', {
        fields: "*"
      }))
    },
    async fetchReferrers() {
      this.referrers = await useDirectus().client.request(readUsers({
        fields: ["*"],
        filter: {
          role: {
            name: {
              _eq: 'User'
            }
          },
          id: {
            _neq: useAuth().user.id
          }
        }
      }));
      this.referrers = this.referrers.map(r => ({
        ...r,
        name: `${r.first_name} ${r.last_name}`
      }))
    },
    async fetchDepartements() {
      this.departements = await useDirectus().client.request(readItems('Departements', {
        fields: "*"
      }))
    },
    async update() {
      let user = this.state;

      // we allow edit of first_name, last_name, email, avatar, location, title, phone, availability, schedule_start, schedule_end, competences, departement, referrer, batiment, for all other field, delete them
      user = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        avatar: this.state.avatar,
        location: this.state.location,
        title: this.state.title,
        phone: this.state.phone,
        availability: this.state.availability,
        schedule_start: this.state.schedule_start,
        schedule_end: this.state.schedule_end,
        competences: this.state.competences,
        departement: this.state.departement,
        referrer: this.state.referrer,
        batiment: this.state.batiment,
      }

      await useDirectus().client.request(updateUser(this.state.id, {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        avatar: this.state.avatar,
        location: this.state.location,
        title: this.state.title,
        phone: this.state.phone,
        availability: this.state.availability,
        schedule_start: this.state.schedule_start,
        schedule_end: this.state.schedule_end,
        competences: this.state.competences,
        departement: this.state.departement,
        referrer: this.state.referrer,
        batiment: this.state.batiment,
      }));
      useToast().add({
        id: 'valid_update',
        title: 'Mise à jour effectuée',
        description: 'Vos informations ont été mises à jour avec succès',
        color: 'green'
      })

      await this.fetchState();
    },
    updatePhoto() {
      this.$refs['input-file'].click();
    },
    async handleUploadFile(event) {
      this.file = event.target.files[0];

      const formData = new FormData();
      formData.append('file_1_property', 'Value');
      formData.append('file', this.file);

      const result = await useDirectus().client.request(uploadFiles(formData));

      console.log(result)
      this.state.avatar = result.id;
      await this.update();
    }
  }
})
</script>

<style scoped>

</style>
