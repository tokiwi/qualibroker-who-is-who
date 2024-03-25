import {useDirectus} from "~/composables/useDirectus";
import {useAuth} from "~/stores/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {

  if (!useDirectus().client) {
    useDirectus().init()
  }

  if (!useAuth().user) {
    try {
      await useDirectus().client.refresh();
      await useDirectus().getUser();
    } catch (e) {
      // redirect to login
      if (to.path !== '/login') {
        return navigateTo('/login')
      }
    }
  }

  if (useAuth().user && to.path === '/login') {
    return navigateTo('/')
  }
})
