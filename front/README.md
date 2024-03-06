# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# bun
bun run dev
```

## Production

Build the application for production:

```bash

# bun
bun run build
```

Locally preview production build:

```bash
# bun
bun run preview
```


## Sequence Diagram for Auth

```mermaid
sequenceDiagram
    participant Client Nuxt
    participant Server Nuxt
    participant Directus
    participant Google 
    Client Nuxt->>Directus: Request Auth
    Directus->>Google: Auth
    Google->>Directus: Validate Auth
    Directus->>Server Nuxt: Request refresh (with httpOnly cookie)
    Server Nuxt->>Client Nuxt: Redirect
```
