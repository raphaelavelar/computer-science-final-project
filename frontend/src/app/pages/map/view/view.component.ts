import { Component } from '@angular/core';
import { map, tileLayer } from 'leaflet';

/*
* This map visualisation was created following Leaflet's quick start guide
* Reference: https://leafletjs.com/examples/quick-start/
*/
@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {
  public ngOnInit() {
    const mapView = map("map").setView([-29.625708, -52.747148], 7);
    tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxNativeZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapView);
  }
}
