import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Map } from '../../interfaces/map';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    url = "";

    constructor(private _httpClient: HttpClient) {
        this.url = `${environment.apiUrl}/api/map/`;
    }

    public create(map: Map) {
        return this._httpClient.post<Map>(this.url, map);
    }

    public list() {
        return this._httpClient.get<Map[]>(this.url);
    }
}
