import { Component } from '@angular/core';
import { map, tileLayer, marker, icon, popup } from 'leaflet';
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
    icons = {
        "danger": this._createIcon("danger.svg"),
        "food bank": this._createIcon("food bank.svg"),
        "medical services": this._createIcon("medical services.svg"),
        "people": this._createIcon("people.svg"),
        "person": this._createIcon("person.svg"),
        "pet shelter": this._createIcon("pet shelter.svg"),
        "search": this._createIcon("search.svg"),
        "shelter": this._createIcon("shelter.svg"),
        "warning": this._createIcon("warning.svg"),
        "water": this._createIcon("water.svg"),
    }

    constructor(
        private _mapService: MapService,
        private _snackBar: MatSnackBar
    ) {}

    private _createIcon(iconUrl: string) {
        return icon({
            iconUrl: iconUrl,
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
        })
    }

    public ngOnInit() {
        const mapView = map("map").setView([-29.625708, -52.747148], 7);
        tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxNativeZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mapView);
        mapView.on("click", (e) => {
            popup().setLatLng(e.latlng).setContent(`Latitude: ${e.latlng.lat} <br /> Longitude: ${e.latlng.lng}`).openOn(mapView);
        })

        this._mapService.list().subscribe({
            next: (mapItems: Map[]) => {
                mapItems.forEach((mapItem: Map) => {

                    const mapMarker = marker([mapItem.latitude, mapItem.longitude], {
                        title: mapItem.name,
                        riseOnHover: true,
                        icon: this.icons["search"]
                    }).addTo(mapView);
                    mapMarker.bindPopup(`<h1>${mapItem.name}</h1><p>${mapItem.description}</p><a href="/map/${mapItem.id}">Details</a>`);
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
