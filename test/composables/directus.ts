import {createDirectus, rest, authentication, readMe, readTranslations,} from "@directus/sdk";
import {useAuth} from "~/stores/useAuth";

let client;
let translations;
let language = 'fr-FR'
export const useDirectus = () => {

  const init = () => {
    client = createDirectus(useRuntimeConfig().public.directusUrl).with(authentication('cookie', {credentials: 'include'})).with(rest({credentials: 'include'}));
  }

  const getUser = async () => {
    useAuth().user = await client.request(readMe({fields: ["*", "role.name", "locality.*"]}))
    useAuth().locality = useAuth().user.locality
    useAuth().user.locality = useAuth().user.locality.id
  }

  const logout = async () => {
    await client.logout()
    useAuth().user = null;
  }

  const getTranslations = async () => {
    translations = await client.request(readTranslations())
  }

  const translate = (key) => {
    return translations.find(t=>t.language == language && t.key == key).value;
  }

  return {client, getUser, logout, init, getTranslations, translate}
}
