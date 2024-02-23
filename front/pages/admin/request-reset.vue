<template>
  <div class="h-full w-full flex items-center justify-center">
    <UForm :schema="schema" :state="state" @submit="reset" class="bg-white rounded-xl p-5 flex flex-col gap-4 min-w-[340px] min-h-[200px]">
      <UFormGroup label="Email" name="email">
        <UInput type="text" v-model="state.email" placeholder="john.doe@qualibroker.ch"/>
      </UFormGroup>
      <UFormGroup label="Confirmer l'adresse email" name="confirmEmail">
        <UInput type="text" v-model="state.confirmEmail" placeholder="john.doe@qualibroker.ch"/>
      </UFormGroup>
      <div class="flex gap-2 mt-auto">
        <UButton type="submit" color="gray">M'envoyer le lien de réinitialisation</UButton>
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
        confirmEmail: string().required("Requis").email('Une adresse email valide est requise').oneOf([ref('email')], 'Les adresses doivent correspondre')
      }),
      state: {
        email: '',
        confirmEmail: ''
      }
    }
  },
  methods: {
    async reset() {
      const { requestPasswordReset } = useDirectusAuth();
      try {
        await requestPasswordReset({ email: this.state.email});
        useToast().add({
          id: 'valid_request',
          title: 'Demande effectuée',
          description: 'Vous allez maintenant être redirigé sur la page de connexion',
          color: 'green'
        })
        setTimeout(() => {
          useRouter().push('/login')
        }, 2000);
      } catch (e) {
        useToast().add({
          id: 'error_reset',
          title: 'Une erreur est survenue',
          description: 'Veuillez réessayer plus tard',
          color: 'red'
        })
      }
    }
  }
}

</script>

<style scoped>

</style>
