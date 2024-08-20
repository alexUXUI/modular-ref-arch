import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

console.log('Starting Eng Workbench 👷‍♀️');

// After this point we can load runtime modules
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => { })
  .catch((err) => console.error(err));
