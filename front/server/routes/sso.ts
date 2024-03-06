export default defineEventHandler(async (event) => {
  let directus_refresh_token = getCookie(event, 'directus_refresh_token');
  console.log(directus_refresh_token);

  if (!directus_refresh_token) {
    return await sendRedirect(event, '/login', 200)
  }


  try {
    const config = useRuntimeConfig(event)
    const {url} = config.public.directus

    const result = await fetch(`${url}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify({
        refresh_token: directus_refresh_token
      })
    })

    const data = await result.json()

    console.log(data)
    if (data.error) {
      return await sendRedirect(event, '/login', 200)
    }

    directus_refresh_token = data.data.refresh_token
    const directus_token = data.data.access_token
    const directus_token_expired_at = data.data.expires

    if (directus_refresh_token != null) {
      setCookie(event, 'directus_token', directus_token);
    }
    if (directus_refresh_token != null) {
      setCookie(event, 'directus_token_expired_at', directus_token_expired_at);
    }
    if (directus_refresh_token != null) {
      setCookie(event, 'directus_refresh_token', directus_refresh_token);
    }

    return await sendRedirect(event, '/', 200)
  } catch (error) {
    console.error(error)
    return await sendRedirect(event, '/login', 200)
  }
})
