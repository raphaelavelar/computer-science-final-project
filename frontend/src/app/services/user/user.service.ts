import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserLogin, UserRegister } from '../../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private _httpClient: HttpClient) { }

    public register(user: UserRegister): Observable<any> {
        const url = `${environment.apiUrl}/api/users/`;

        return this._httpClient.post(url, user);
    }

    public login(user: UserLogin): Observable<any> {
        const url = `${environment.apiUrl}/api/users/login/`;

        return this._httpClient.post(url, user);
    }
}
