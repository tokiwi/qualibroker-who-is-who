import {useDirectus} from "~/composables/directus";

export default defineNuxtRouteMiddleware(async (to, from) => {

  if(!useDirectus().client)
  {
    useDirectus().init()
  }

  if(!useDirectus().translations)
  {
    useDirectus().getTranslations()
  }

  if(!useAuth().user)
  {
    try{
      await useDirectus().client.refresh();
      await useDirectus().getUser();
    }catch (e){
    }
  }

  if(useAuth().user)
  {
    let redirect = localStorage.getItem('redirect')

    if(redirect)
    {
      localStorage.removeItem('redirect')
      return navigateTo(redirect)
    }
  }


  if(to.path == '/login'){
    if(useAuth().user){
      switch (useAuth().user.role.name){
        case 'Administrator':
          return navigateTo('/admin/arvr/stats')
        case 'Commune':
          return navigateTo('/admin/folders')
      }
    }
  }

  if(to.path.indexOf('/admin') >= 0 && !useAuth().user)
  {
    localStorage.setItem('redirect', to.path)
    return navigateTo('/login')
  }

})
