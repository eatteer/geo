import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, Marker, GeoJSONSource } from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('map')
  public mapRefeference!: ElementRef<HTMLDivElement>;

  public map!: Map;

  public updateCount = 0;

  public ngAfterViewInit(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;

        this.map = new Map({
          container: this.mapRefeference.nativeElement,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: { lng: longitude, lat: latitude },
          zoom: 15,
        });

        this.map.on('load', () => {
          navigator.geolocation.watchPosition(
            (position) => {
              const { longitude, latitude } = position.coords;

              this.updateCount++;
              console.log({ longitude, latitude });

              if (this.map.getSource('user')) {
                const source = this.map.getSource('user') as GeoJSONSource;
                source.setData({
                  type: 'FeatureCollection',
                  features: [
                    {
                      type: 'Feature',
                      properties: {},
                      geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                      },
                    },
                  ],
                });
              } else {
                this.map.addSource('user', {
                  type: 'geojson',
                  data: {
                    type: 'FeatureCollection',
                    features: [
                      {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                          type: 'Point',
                          coordinates: [longitude, latitude],
                        },
                      },
                    ],
                  },
                });

                this.map.addLayer({
                  id: 'point',
                  type: 'circle',
                  source: 'user',
                  paint: {
                    'circle-radius': 10,
                    'circle-color': '#3887be',
                  },
                });
              }
            },
            () => {},
            { enableHighAccuracy: true }
          );
        });
      },
      () => {},
      { enableHighAccuracy: true }
    );
  }
}
