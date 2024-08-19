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
            entry: 'http://localhost:4000/mf-manifest.json',
          },
          {
            name: 'plugin',
            entry: 'http://localhost:4001/mf-manifest.json',
          },
        ],
      });

      const md = await loadRemote<{ add: (...args: Array<number>) => number }>(
        'viewer/viewer',
      );
      console.log('Viewer module loaded:', md);
    } catch (error) {
      console.error('Error loading Viewer module:', error);
    }
  }
}
