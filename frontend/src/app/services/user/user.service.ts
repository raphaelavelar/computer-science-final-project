import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserRegister } from '../../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private _httpClient: HttpClient) { }

    public register(registerUser: UserRegister): Observable<void> {
        const url = `${environment.apiUrl}/users?format=api`;

        return this._httpClient.post<void>(url, registerUser, {
          headers: {
            "Referrer-policy": "no-referrer",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Origin,Access-Control-Allow-Methods",
            "Access-Control-Allow-Methods": "OPTION,GET,POST"
          }
        });
    }
}
