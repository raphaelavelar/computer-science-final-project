import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserLogin } from '../../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../services/user/user.service';
import { setToken } from '../../../helpers/auth.helper';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    form: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _userService: UserService
    ) {}

    public ngOnInit() {
        this.form = this._formBuilder.group({
            username: ["", [Validators.required, Validators.maxLength(150)]],
            password: ["", [Validators.required, Validators.maxLength(128)]],
            non_field_errors: [""],
        })
    }

    public onSubmit() {
        if(this.form.valid) {
            const user: UserLogin = {
                username: this.form.controls.username.value,
                password: this.form.controls.password.value,
            }

            this._userService.login(user).subscribe({
                next: (response: any) => {
                    setToken(response.token);
                    this._router.navigate(["/"]);
                },
                error: (error: HttpErrorResponse) => {
                    console.error(error)
                    for(const [key, value] of Object.entries(error.error)) {
                        if(key in this.form.controls) {
                            this.form.controls[key].setErrors(value);
                        }
                    }
                    this.form.valid = true
                }
            })
        }
    }
}
