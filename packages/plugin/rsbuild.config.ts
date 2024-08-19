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
        uniqueName: 'plugin',
      },
      plugins: [
        new ModuleFederationPlugin({
          name: 'plugin',
          exposes: {
            './accuris-plugin': './src/index.ts',
          },
          shared: {
            lit: {
              singleton: true,
              requiredVersion: '^3.2.0',
            },
          },
        }),
      ],
    },
  },
});
