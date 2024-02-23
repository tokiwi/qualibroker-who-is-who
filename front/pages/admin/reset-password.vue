<template>
  <div class="h-full w-full flex items-center justify-center">
    <UForm :schema="schema" :state="state" @submit="submit" class="bg-white rounded-xl p-5 flex flex-col gap-4 min-w-[340px] min-h-[200px]">
      <UFormGroup label="Nouveau mot de passe" name="password">
        <UInput type="password" v-model="state.password"/>
      </UFormGroup>
      <UFormGroup label="Confirmer le mot de passe" name="confirmPassword">
        <UInput type="password" v-model="state.confirmPassword"/>
      </UFormGroup>
      <div class="flex gap-2 justify-between">
        <UButton type="submit" color="gray">Changer le mot de passe</UButton>
      </div>
    </UForm>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {object, string, ref} from "yup";

export default defineComponent({
  name: "reset-password",
  data() {
    return {
      schema: object({
        password: string().required("Requis").min(8, "Doit faire au minimum 8 caractères"),
        confirmPassword: string().required("Requis").oneOf([ref('password')], 'Les mots de passe doivent correspondre')
      }),
      state: {
        password: '',
        confirmPassword: ''
      },
      token: ''
    }
  },
  mounted() {
    // get the query params token
    this.token = useRoute().query.token
  },
  methods: {
    async submit() {
      const { resetPassword } = useDirectusAuth();
      try {
        await resetPassword({ token: this.token, password: this.state.password });
        useToast().add({
          id: 'valid_reset',
          title: 'Mot de passe réinitialisé',
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
          description: 'Vérifier que votre lien n\'a pas déjà été utilisé',
          color: 'red'
        })
      }
    }
  }
})
</script>

<style scoped>

</style>
