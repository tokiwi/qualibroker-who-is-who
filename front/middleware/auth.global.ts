import {useDirectus} from "~/composables/useDirectus";
import {useAuth} from "~/stores/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {

  if (!useDirectus().client) {
    useDirectus().init()
  }

  // if the user is not logged in, try to refresh the token
  if(!useAuth().user) {
    try {
      await useDirectus().client.refresh();
      await useDirectus().getUser();
    } catch (e) {
    }
  }

  // if the user is still not logged in, redirect to login
  if (!useAuth().user) {
    return navigateTo('/login')
  }

  // if the user is logged in, redirect to home if trying to access login
  if (useAuth().user && to.path === '/login') {
    return navigateTo('/')
  }
})
