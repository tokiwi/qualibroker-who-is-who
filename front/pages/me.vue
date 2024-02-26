<template>
  <div class="flex flex-col gap-5 pt-10">
    <Navigation></Navigation>
    <div class="flex flex-col gap-4">
      <div class="text-3xl font-bold">
        Mon Profil
      </div>
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-11 items-start">
        <div class="xl:col-span-8 p-6 bg-white rounded-xl">
          <UForm @submit="update" @keydown.enter.prevent :state="state" class="grid grid-cols-2 gap-6">
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
                  <UFormGroup label="Département" name="department">
                    <USelectMenu v-model="state.department"
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


                  <template v-for="day in days">
                    <div>
                      <UCheckbox color="green" :ui="{'inner': 'ms-1 flex flex-col'}" v-model="state.availability"
                                 :value="day.key" :label="day.label"/>
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
            <div class="col-span-2 flex gap-2 justify-end">
              <UButton size="lg" type="submit" class="text-center">Sauvegarder</UButton>
            </div>
          </UForm>
        </div>
        <div class="xl:col-span-4 bg-white rounded-xl">
          <div class="p-6 font-bold text-xl">
            Photo de profil
          </div>
          <div class="p-6 bg-gray-100 flex items-center justify-center">
            <img :src="img(state.avatar, { width: 300, format: 'jpg' })"
                 class="w-32 h-32 rounded-full outline outline-offset-4 outline-qualibroker-600" alt="">
          </div>
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

<script lang="ts">
import {defineComponent} from 'vue'
import {definePageMeta, useDirectusUsers} from "#imports";
import type {DirectusUser, DirectusUserRequest} from "nuxt-directus/dist/runtime/types";

definePageMeta({
  middleware: ['auth'],
});

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
      state: useDirectusUser(),
      batiments: [],
      departements: [],
      referrers: [],
      file: null,
    }
  },
  mounted() {
    this.fetchBatiments();
    this.fetchDepartements();
    this.fetchReferrers();

    if (this.state.availability == null) {
      this.state.availability = [];
    }
    if (this.state.competences == null) {
      this.state.competences = [];
    }
  },
  methods: {
    img(params) {
      const {getThumbnail} = useDirectusFiles();
      return getThumbnail(params);
    },
    async fetchBatiments() {
      const {getItems} = useDirectusItems();
      try {
        this.batiments = await getItems({
          collection: "Batiments",
          params: {
            fields: ["*"],
          }
        });
      } catch (error) {
        console.log(error)
      }
    },
    async fetchReferrers() {
      try {
        this.referrers = await useDirectusUsers().getUsers({
          params: {
            fields: ["*"],
          }
        });

        this.referrers = this.referrers.map(r => ({
          ...r,
          name: `${r.first_name} ${r.last_name}`
        }))
      } catch (error) {
        console.log(error)
      }
    },
    async fetchDepartements() {
      const {getItems} = useDirectusItems();
      try {
        this.departements = await getItems({
          collection: "Departements",
          params: {
            fields: ["*"],
          }
        });
      } catch (error) {
        console.log(error)
      }
    },
    async update() {
      const {updateUser} = useDirectusUsers();
      let user = this.state;

      // we allow edit of first_name, last_name, email, avatar, location, title, phone, availability, schedule_start, schedule_end, competences, department, referrer, batiment, for all other field, delete them
      user = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        avatar: this.state.avatar,
        location: this.state.location,
        title: this.state.title,
        phone: this.state.phone,
        availability: this.state.availability,
        schedule_start: this.state.schedule_start,
        schedule_end: this.state.schedule_end,
        competences: this.state.competences,
        department: this.state.department,
        referrer: this.state.referrer,
        batiment: this.state.batiment,
      }

      await updateUser({
        id: this.state.id,
        user
      });
      useToast().add({
        id: 'valid_update',
        title: 'Mise à jour effectuée',
        description: 'Vos informations ont été mises à jour avec succès',
        color: 'green'
      })
    },
    updatePhoto() {
      this.$refs['input-file'].click();
    },
    async handleUploadFile(event) {
      this.file = event.target.files[0];

      const directus = useDirectus();

      const formData = new FormData();
      formData.append('file_1_property', 'Value');
      formData.append('file', this.file);

      const result = await directus('/files', {
        method: 'POST',
        body: formData,
      })

      console.log(result)
      this.state.avatar = result.data.id;
      await this.update();

      await this.fetchCurrentUser();
    }
  }
})
</script>

<style scoped>

</style>
