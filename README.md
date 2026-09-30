# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Streamify

Streamify is a browser-based music client for a Navidrome server. It uses the Subsonic-compatible API for library browsing, search, favorites, cover art, and audio streaming.

## Connect to Navidrome

1. Start Navidrome and make sure you have a valid Navidrome user account. Streamify does not create server accounts.
2. Run `npm install` and `npm run dev`.
3. Open the Vite URL and sign in with your Navidrome username and password. By default Streamify connects to `http://localhost:4533`.
4. If the frontend and Navidrome use different origins, allow the frontend's exact origin in the Navidrome CORS settings. For local Vite development, this is usually `http://localhost:5173`. CORS must allow API, image, and audio requests from that origin.

For a different server, set `VITE_NAVIDROME_URL` in a local `.env` file (for example, `https://music.example.com`) and restart Vite. A `.env.example` is provided.

Use HTTPS for remote servers. Browsers block an HTTP Navidrome server when Streamify itself is loaded over HTTPS (mixed content). The authentication token is stored in this browser's local storage; the password is not stored.

## Development

- `npm run dev` starts the development server.
- `npm run build` creates the production build.
- `npm run lint` runs ESLint.
