import { Component } from '@angular/core';
import { map, tileLayer, marker } from 'leaflet';
import { MapService } from '../../../services/map/map.service';
import { Map } from '../../../interfaces/map';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    constructor(
        private _mapService: MapService,
        private _snackBar: MatSnackBar
    ) {}

    public ngOnInit() {
        const mapView = map("map").setView([-29.625708, -52.747148], 7);
        tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxNativeZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mapView);

        this._mapService.list().subscribe({
            next: (mapItems: Map[]) => {
                mapItems.forEach((mapItem: Map) => {
                    marker([mapItem.latitude, mapItem.longitude], {
                        title: mapItem.name,
                        riseOnHover: true,
                    }).addTo(mapView);
                });
            },
            error: (error: HttpErrorResponse) => {
                console.error(error);
                this._snackBar.open(`An error occurred when retrieving map items`, "Okay", {
                    duration: 3000
                });
            }
        })

        
    }
}
