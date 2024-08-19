export const register = (kernel: any) => {
  console.log('[Kernel] RegisterPlugin', kernel);
  import('./plugin.ts').then((module) => {
    customElements.define('plugin-element', module.PluginElement);
  });
};

if (process.env.NODE_ENV === 'development') {
  register(window);
}
