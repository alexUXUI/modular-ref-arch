const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const IgnorePlugin = require("webpack").IgnorePlugin;
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: "engWorkbench",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new IgnorePlugin({
      resourceRegExp: /^Viewer\/viewer$/,
    }),
    new ModuleFederationPlugin({
      library: { type: "module" },

      // For remotes (please adjust)
      name: "engWorkbench",
      filename: "remoteEntry.js",
      // exposes: {
      //   "./Component": ".//src/app/app.component.ts",
      // },
      remotes: {
        "./Viewer": "viewer@http://localhost:4000/mf-manifest.json",
      },

      // shared: share({
      //   "@angular/core": {
      //     singleton: true,
      //     strictVersion: true,
      //     requiredVersion: "auto",
      //   },
      //   "@angular/common": {
      //     singleton: true,
      //     strictVersion: true,
      //     requiredVersion: "auto",
      //   },
      //   "@angular/common/http": {
      //     singleton: true,
      //     strictVersion: true,
      //     requiredVersion: "auto",
      //   },
      //   "@angular/router": {
      //     singleton: true,
      //     strictVersion: true,
      //     requiredVersion: "auto",
      //   },

      //   ...sharedMappings.getDescriptors(),
    }),
    sharedMappings.getPlugin(),
  ],
};
