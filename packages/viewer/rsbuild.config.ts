import { defineConfig } from '@rsbuild/core';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  server: {
    port: 4000,
  },
  html: {
    template: './src/index.html',
  },
  // enable to get typescript support
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'kernel',
          remotes: {
            plugin: 'plugin@http://localhost:4001/mf-manifest.json',
          },
          // shared: ['lit'],
        }),
      ],
    },
  },
});
