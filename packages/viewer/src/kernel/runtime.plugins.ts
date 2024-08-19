import { init, loadRemote } from '@module-federation/enhanced/runtime';

/**
 * These are runtime modules that are shared between the Host (Kernel) and remote (Plugin)
 * These modules are managed by the Federation Runtime, which is being encapsulated by the PluginLoader class.
 */
const remotes = [
  {
    name: 'plugin',
    entry: 'http://localhost:4001/mf-manifest.json', // this URL will be dynamically pulled from the registry
    module: 'accuris-plugin',
  },
];

/**
 * The shared modules are used to share dependencies between the Host (Kernel) and remote (Plugin).
 * Lit is a shared module that is used by both the Host and remote.
 * Rather than loading Lit multiple times, the Federation Runtime ensures that Lit is loaded only once.
 */
const shared = {
  lit: {
    scope: 'default', // where the module is loaded.
    // how the module is shared.
    shareConfig: {
      singleton: true,
      requiredVersion: '^3.2.0',
    },
  },
};

interface Remote {
  register: (kernel: any) => void;
  ['string']: { default: () => void };
}

export class RuntimePlugins {
  pluginConfig: { name: string; entry: string; module: string }[] = [];
  plugins = new Map<string, { default: () => void }>();

  constructor() {
    this.initFederationRuntime();
  }

  initFederationRuntime() {
    init({ name: 'kernel', remotes, shared });
  }

  async getPluginConfig() {
    // simulate async loading from registry
    await setTimeout(() => {
      this.pluginConfig = remotes;
      return this.pluginConfig;
    }, 200);
  }

  async getPlugins() {
    return remotes.forEach(async (remote) => {
      const remoteModuleName = `${remote.name}/${remote.module}`;
      try {
        const _remote = await loadRemote<Remote>(remoteModuleName);
        if (_remote) {
          console.log('[federation][remote loaded]', _remote);
          this.plugins.set(remote.name, _remote);

          if (Object.hasOwnProperty.call(_remote, 'register')) {
            console.log('[federation][remote register]');
            _remote.register(this);
          }
        } else {
          console.log('[federation][remote load failed]');
        }
      } catch (error) {
        console.log('ERROR', error);
      }
    });
  }

  getModule(name: string) {
    return this.plugins.get(name);
  }

  getModules() {
    return Array.from(this.plugins);
  }
}
