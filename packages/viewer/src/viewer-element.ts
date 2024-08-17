import { html, css, LitElement } from 'lit';
import * as FederationRuntime from '@module-federation/enhanced/runtime';

FederationRuntime.init({
  name: 'federation_consumer',
  remotes: [
    {
      name: "federation_provider",
      entry: "http://localhost:4001/mf-manifest.json",
    },
  ],
  shared: {
    lit: {
      scope: 'default',
      shareConfig: {
        singleton: true,
        requiredVersion: '^3.2.0',
      },
    },
  },
});

FederationRuntime.registerPlugins([{
  name: 'accurisRuntimePlugin',
  onLoad: (plugin) => {
    console.log('[Accuris Runtime][Loaded Plugin]', plugin);
  }
}]);

FederationRuntime.loadRemote<{ default: () => void }>("federation_provider/accuris-plugin")
  .then((md) => {
    console.log('[federation][load remote] Accuris Plugin');

    if (md) {
      console.log('[federation][remote loaded]')
      // md.default();
      console.log('Accuris Plugin', md);

    } else {
      console.log('[federation][remote load failed]');

      // @ts-ignore
      import('accuris-plugin').then((accurisPlugin) => {
        console.log('[npm][fallback] Accuris Plugin', accurisPlugin);
      });
    }
  }).catch((e) => {
    console.log('ERROR', e);
    // @ts-ignore
    import('accuris-plugin').then((accurisPlugin) => {
      console.log('[npm][fallback] Accuris Plugin', accurisPlugin);
    });
  });

export class ViewerElement extends LitElement {
  static styles = css`
    .content {
      display: flex;
      min-height: 100vh;
      line-height: 1.1;
      text-align: center;
      flex-direction: column;
      justify-content: center;
    }

    .content h1 {
      font-size: 3.6rem;
      font-weight: 700;
    }

    .content p {
      font-size: 1.2rem;
      font-weight: 400;
      opacity: 0.5;
    }
  `;

  render() {
    return html`
      <div class="content">
        <h1>Viewer</h1>
        <plugin-element></plugin-element>
      </div>
    `;
  }
}
