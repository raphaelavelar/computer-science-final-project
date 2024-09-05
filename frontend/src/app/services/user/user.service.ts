import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserLogin, UserRegister } from '../../interfaces/user';
import { Subject, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userLoggedIn: Subject<boolean> = new Subject();

    constructor(private _httpClient: HttpClient) { }

    public register(user: UserRegister) {
        const url = `${environment.apiUrl}/api/users/`;

        return this._httpClient.post(url, user);
    }

    public login(user: UserLogin) {
        const url = `${environment.apiUrl}/api/users/login/`;

        return this._httpClient.post(url, user).pipe(
            tap(() => this.userLoggedIn.next(true))
        );
    }

    public logout() {
        const url = `${environment.apiUrl}/api/users/logout/`;

        return this._httpClient.post(url, {});
    }
}
