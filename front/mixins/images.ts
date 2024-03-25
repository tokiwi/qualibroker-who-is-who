import {useDirectus} from "~/composables/useDirectus";
import {readAssetRaw} from "@directus/sdk";

export default {
  methods: {
    img(header: string, options: { width: number, format: string }) {
      useDirectus().client.request(readAssetRaw(header, {
        width: options.width,
        format: options.format
      }))

      return useRuntimeConfig().public.directus.url+'/assets/'+header+'?width='+options.width+'&format='+options.format;
    }
  },
}
