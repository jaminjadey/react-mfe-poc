# Module Federation + Iframe Adaptor (Strangler POC)

This demo shows how to:
- Keep your legacy shell static and swap content via an `<iframe>`.
- Use a small React "iframe adaptor" that loads MFEs by query parameter.
- Independently build/serve React MFEs (Module A / Module B) with Webpack Module Federation.

## Run locally

```bash
npm install
npm run dev
```

- Shell: http://localhost:8080
- Iframe adaptor (host): http://localhost:3000
- Module A remote: http://localhost:3001/remoteEntry.js
- Module B remote: http://localhost:3002/remoteEntry.js

Click the nav links on the shell home page to see each MFE render inside the iframe.

## How it works

- The shell is just `index.html` with a header/nav/footer and an `<iframe id="app-frame">`.
- Nav links set the iframe `src` to the iframe adaptor with a query param, e.g.
  - `http://localhost:3000/?page=a` → loads Module A (`remoteEntry.js`) and mounts `./Page`.
  - `http://localhost:3000/?page=b` → loads Module B.
- The adaptor loads remotes at runtime (no compile-time remotes), injects `remoteEntry.js`, and then fetches the exposed `./Page` module and renders it.

## Production notes

- Add CSP and sandbox to the iframe as needed (we include a sensible `sandbox` attribute).
- Each MFE can be built and deployed separately; the adaptor can route by feature flags or URL mapping.
- Gradually replace legacy pages by pointing the iframe to the adaptor, then retire legacy content once a page is fully reimplemented.
