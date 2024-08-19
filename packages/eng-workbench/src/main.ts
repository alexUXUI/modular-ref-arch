import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

console.log('Starting Eng Workbench 👷‍♀️');

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {})
  .catch((err) => console.error(err));
