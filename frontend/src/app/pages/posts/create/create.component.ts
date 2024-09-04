import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { Post } from '../../../interfaces/post';
import { PostService } from '../../../services/post/post.service';

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
      private _postService: PostService,
      private _snackBar: MatSnackBar
  ) {}

  public ngOnInit() {
      this.form = this._formBuilder.group({
          title: ["", [Validators.required, Validators.maxLength(150)]],
          content: ["", [Validators.required, Validators.maxLength(1500)]],
      })
  }

  public onSubmit() {
      if(this.form.valid) {
          const post: Post = {
              title: this.form.controls.title.value,
              content: this.form.controls.content.value,
              author: 1,
          }

          this._postService.create(post).subscribe({
              next: () => this._router.navigate(["/"]),
              error: (error: HttpErrorResponse) => {
                  console.error(error)
                  for(const [key, value] of Object.entries(error.error)) {
                        if(key in this.form.controls) {
                            this.form.controls[key].setErrors(value);
                        }
                  }
                  this._snackBar.open(`An error occurred when creating the new item`, "Okay", {
                      duration: 3000
                  });
              }
          })
      }
  }
}
