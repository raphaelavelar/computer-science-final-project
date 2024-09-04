import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { Map } from '../../../interfaces/map';
import { MapService } from '../../../services/map/map.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  form: any;

  constructor(
      private _formBuilder: FormBuilder,
      private _router: Router,
      private _mapService: MapService,
      private _snackBar: MatSnackBar
  ) {}

  public ngOnInit() {
      this.form = this._formBuilder.group({
          name: ["", [Validators.required, Validators.maxLength(150)]],
          description: ["", [Validators.required, Validators.maxLength(128)]],
          latitude: ["", [Validators.max(90.0), Validators.min(-90.0)]],
          longitude: ["", [Validators.max(180.0), Validators.min(-180.0)]],
      })
  }

  public onSubmit() {
      if(this.form.valid) {
          const Map: Map = {
              name: this.form.controls.name.value,
              description: this.form.controls.description.value,
              latitude: this.form.controls.latitude.value,
              longitude: this.form.controls.longitude.value,
          }

          this._mapService.create(Map).subscribe({
              next: () => this._router.navigate(["/map/view"]),
              error: (error: HttpErrorResponse) => {
                  console.error(error)
                  for(const [key, value] of Object.entries(error.error)) {
                      this.form.controls[key].setErrors(value);
                  }
                  this._snackBar.open(`An error occurred when creating the new item`, "Okay", {
                      duration: 3000
                  });
              }
          })
      }
  }
}
