import {useDirectus} from "~/composables/useDirectus";
import {useAuth} from "~/stores/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {

  if (!useDirectus().client) {
    useDirectus().init()
  }

  // if the user is not logged in, try to refresh the token
  if (!useAuth().user) {
    try {
      await useDirectus().client.refresh();
      await useDirectus().getUser();
    } catch (e) {
    }
  }

  if(!useAuth().user && to.path != '/login') {
    // user is not logged in, so we redirect to the login page
    return navigateTo('/login')
  }

  if(useAuth().user && to.path == '/login') {
    // user is logged in, so we redirect to the home page
    return navigateTo('/')
  }
})
