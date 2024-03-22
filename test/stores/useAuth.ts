import {defineStore} from "pinia";
import type {Ref} from "vue";
import {useLocalStorage} from "@vueuse/core";

export const useAuth = defineStore('auth', () => {

  let user: Ref = ref()
  let locality: Ref = ref();

  return {
    locality,
    user
  }
})
