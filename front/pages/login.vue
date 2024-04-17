<template>
  <div class="h-full w-full flex items-center justify-center grow">
    <div class="bg-white rounded-xl p-5 flex flex-col gap-4 min-w-[340px]">
      <template v-if="isLocalVersion">
        <UForm :schema="schema" :state="state" @submit="login" class="flex flex-col gap-4">
          <UFormGroup label="Email" name="email">
            <UInput type="text" v-model="state.email" placeholder="john.doe@qualibroker.ch"/>
          </UFormGroup>
          <UFormGroup label="Password" name="password">
            <UInput type="password" v-model="state.password"/>
          </UFormGroup>
          <div class="flex gap-2 justify-between">
            <UButton type="submit" class="text-center">Se connecter</UButton>
            <UButton @click="forget" color="gray">Mot de passe oublié ?</UButton>
          </div>
        </UForm>
      </template>
      <!--      <a href="http://localhost:8055/auth/login/microsoft?redirect=http://localhost:3000/login"
                    class="flex gap-1 justify-center bg-gray-100 transition-all duration-200 hover:bg-gray-200 rounded-lg border border-gray-300 items-center group overflow-hidden">
                <span
                    class="flex items-center justify-center p-3 bg-gray-200 rounded-sm group-hover:bg-gray-300 transition-all duration-200">
                  <Icon name="i-simple-icons-microsoft" class="text-[30px]"></Icon>
                </span>
              <span class="p-3 grow text-left">
                Connexion avec Microsoft (local)
              </span>
            </a>-->
      <a href="https://admin.meet.qualibroker-swissriskcare.com/auth/login/microsoft?redirect=https://meet.qualibroker-swissriskcare.com/login"
         class="flex gap-1 justify-center bg-gray-100 transition-all duration-200 hover:bg-gray-200 rounded-lg border border-gray-300 items-center group overflow-hidden">
          <span
              class="flex items-center justify-center p-3 bg-gray-200 rounded-sm group-hover:bg-gray-300 transition-all duration-200">
            <Icon name="i-simple-icons-microsoft" class="text-[30px]"></Icon>
          </span>
        <span class="p-3 grow text-left">
          Connexion avec Microsoft
        </span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import {object, ref, string} from "yup";
import {useDirectus} from "#imports";
import {login} from "@directus/sdk";

export default {
  data() {
    return {
      schema: object({
        email: string().required("Requis").email('Une adresse email valide est requise'),
        password: string().required("Requis")
      }),
      state: {
        email: '',
        password: ''
      },
      isLocalVersion: useRuntimeConfig().public.local
    }
  },
  setup() {
    useHead({
      title: 'Connexion',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Connexion'
        }
      ]
    });
  },
  methods: {
    async login() {
      try {
        let result = await useDirectus().client.request(login(this.state.email, this.state.password));

        useToast().add({
          id: 'valid_login',
          title: 'Connexion effectué',
          description: 'Vous allez maintenant être redirigé sur la page d\'accueil',
          color: 'green'
        })
        setTimeout(() => {
          useRouter().push('/')
        }, 1000);
      } catch (e) {
        console.log(e);
        useToast().add({
          id: 'error_login',
          title: 'Erreur de connexion',
          description: 'Veuillez vérifier le mot de passe ou l\'adresse email',
          color: 'red'
        })
      }
    },
    async forget() {
      // redirect to forget password page
      useRouter().push('/admin/request-reset');
    },
  },
}

</script>

<style scoped>

</style>
