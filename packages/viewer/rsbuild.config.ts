import { defineConfig } from '@rsbuild/core';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  server: {
    port: 4000,
  },
  html: {
    template: './src/index.html',
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: true,
  },
  // enable to get typescript support
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'viewer',
          // remotes: {
          //   plugin: 'plugin@http://localhost:4001/mf-manifest.json',
          // },
          exposes: {
            './viewer': './src/index.ts',
          },
        }),
      ],
    },
  },
});
