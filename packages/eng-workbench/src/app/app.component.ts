import { Component } from '@angular/core';
import { init, loadRemote } from '@module-federation/enhanced/runtime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'eng-workbench';

  ngOnInit() {
    this.initModuleFederation();
  }

  async initModuleFederation() {
    try {
      await init({
        name: '@accuris/ewb',
        remotes: [
          {
            name: 'viewer',
            // EWB **DOES NOT** knwo this URL. It must reach out to registry to get it.
            entry: 'http://localhost:4000/mf-manifest.json', // SHOULD BE DYNAMIC
          },
        ],
      });

      const viewerModule = await loadRemote('viewer/viewer');

      console.log('Viewer module loaded:', viewerModule);

    } catch (error) {
      console.error('Error loading Viewer module:', error);
    }
  }
}
