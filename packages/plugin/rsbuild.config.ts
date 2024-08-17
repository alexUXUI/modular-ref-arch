import { defineConfig } from '@rsbuild/core';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  html: {
    template: './src/index.html',
  },
  server: {
    port: 4001,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: true,
  },
  tools: {
    rspack: {
      output: {
        // You need to set a unique value that is not equal to other applications
        uniqueName: 'federation_provider'
      },
      plugins: [
        new ModuleFederationPlugin({
          name: 'federation_provider',
          exposes: {
            './plugin': './src/plugin.ts',
            './accuris-plugin': './build/index.js',
          },
          shared: {
            lit: {
              singleton: true,
              requiredVersion: '^3.2.0',
            },
          }
        }),
      ],
    },
  },
});
