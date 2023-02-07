import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import mapboxgl from 'mapbox-gl';

import { AppModule } from './app/app.module';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY29zc21vcyIsImEiOiJja3o1eTJyNGYwdmJ0MnZuZnZ0NWR5M25iIn0.6P9IHUZ4Zs1uFUpVCeQ8uA';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
