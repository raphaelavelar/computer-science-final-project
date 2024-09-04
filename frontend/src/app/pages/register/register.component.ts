import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserRegister } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    form: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _userService: UserService
    ) {}

    public ngOnInit() {
        this.form = this._formBuilder.group({
            username: ["", [Validators.required, Validators.maxLength(150)]],
            email: ["", [Validators.required, Validators.email, Validators.maxLength(254)]],
            password: ["", [Validators.required, Validators.maxLength(128)]],
        })
    }

    public onSubmit() {
        if(this.form.valid) {
            const user: UserRegister = {
                username: this.form.controls.username.value,
                email: this.form.controls.email.value,
                password: this.form.controls.password.value,
            }

            this._userService.register(user).subscribe({
                next: () => this._router.navigate(["/login"]),
                error: (error: HttpErrorResponse) => {
                    console.log(error);
                    for(const [key, value] of Object.entries(error.error)) {
                        if(key in this.form.controls) {
                            this.form.controls[key].setErrors(value);
                        }
                    }
                }
            })
        }
    }
}
