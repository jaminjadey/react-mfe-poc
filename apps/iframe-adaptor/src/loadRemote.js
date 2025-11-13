/**
 * Dynamically load a Module Federation remote at runtime and get an exposed module.
 *
 * @param {string} remoteUrl - URL to the remoteEntry.js
 * @param {string} scope - container scope name configured in the remote's ModuleFederationPlugin
 * @param {string} module - exposed module key, e.g. './Page'
 */
export async function loadRemote(remoteUrl, scope, module) {
  if (!window[scope]) {
    await new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = remoteUrl;
      el.type = 'text/javascript';
      el.async = true;
      el.onload = () => resolve();
      el.onerror = () => reject(new Error(`Failed to load remote: ${remoteUrl}`));
      document.head.appendChild(el);
    });
  }
  // eslint-disable-next-line no-undef
  await __webpack_init_sharing__('default');
  const container = window[scope];
  // eslint-disable-next-line no-undef
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  return factory();
}
