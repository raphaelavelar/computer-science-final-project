import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { clearToken, getToken } from '../../helpers/auth.helper';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isUserLoggedIn = getToken() != null

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) {
    _userService.userLoggedIn.subscribe((isUserLoggedIn) => this.isUserLoggedIn = isUserLoggedIn)
  }

  logout() {
    this._userService.logout().subscribe({
      next: () => {
        clearToken();
        this._router.navigate(["/"]);
        this.isUserLoggedIn = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error)
        this._snackBar.open(`An error occurred when logging out`, "Okay", {
          duration: 3000
        });
      }
    })
  }
}
