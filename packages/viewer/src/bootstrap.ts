import './index.css';
import { ViewerElement } from './viewer-element.ts';
import { RuntimePlugins } from './kernel/runtime.plugins.ts';

const Kernel = new RuntimePlugins();

(async function bootstrap() {
  await Kernel.getPluginConfig();
  await Kernel.getPlugins();
  console.log('Kernel', Kernel);
})();

customElements.define('viewer-element', ViewerElement);
