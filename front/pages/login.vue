<template>
  <div class="h-full w-full flex items-center justify-center grow">
    <UForm :schema="schema" :state="state" @submit="login" class="bg-white rounded-xl p-5 flex flex-col gap-4 min-w-[340px] min-h-[200px]">
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
  </div>
</template>

<script lang="ts">
import {object, ref, string} from "yup";

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
      }
    }
  },
  methods: {
    async login() {
      const {login} = useDirectusAuth();
      try {
        await login({email: this.state.email, password: this.state.password});
        useToast().add({
          id: 'valid_login',
          title: 'Connexion effectué',
          description: 'Vous allez maintenant être redirigé sur la page d\'accueil',
          color: 'green'
        })
        setTimeout(() => {
          useRouter().push('/')
        }, 2000);
      } catch (e) {
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
    }
  }
}

</script>

<style scoped>

</style>
