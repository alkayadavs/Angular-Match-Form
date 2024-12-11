import { NgIf } from '@angular/common';
import {
  afterNextRender,
  afterRender,
  Component,
  OnInit,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true, 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  //imports: [FormsModule, NgIf],
  imports: [ReactiveFormsModule, NgIf],
})
export class LoginComponent implements OnInit {
  // isErrror: boolean = false;
  // formD = viewChild.required<NgForm>('formH');
  // form = new FormGroup({
  //   email: new FormControl(),
  //   password: new FormControl(),
  // });
  // constructor() {
  //   afterNextRender(() => {
  //     const email = window.localStorage.getItem('email');
  //     console.log(email);
  //     if (email) {
  //       setTimeout(() => {
  //         this.formD().controls['email']?.setValue(email);
  //       }, 1);
  //     }
  //     //throw new Error('Method not implemented.');
  //     this.formD()
  //       .valueChanges?.pipe(debounceTime(1000))
  //       .subscribe({
  //         next: (val) => {
  //           console.log(val);
  //           if (val.email) {
  //             window.localStorage.setItem('email', val.email);
  //           }
  //         },
  //       });
  //   });
  // }
  // onSubmit(formData: NgForm) {
  //   if (
  //     formData.form.controls['email'].valid &&
  //     formData.form.controls['password'].valid
  //   ) {
  //     console.log(formData);
  //     console.log(formData.value.email);
  //     console.log(formData.value.password);
  //   }
  //   this.formD().reset();
  //   window.localStorage.clear();
  // }

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required, this.QMarkneeded],
    }),
    password: new FormControl('', {
      validators: [
        Validators.minLength(6),
        Validators.required,
        this.QMarkneeded,
      ],
    }),
  });

  ngOnInit(): void {
    const email = window.localStorage.getItem('email');
    console.log(email);
    if (email) {
      this.form.setValue({ email: email, password: 'text' });
    }
    //throw new Error('Method not implemented.');
    this.form.valueChanges?.pipe(debounceTime(1000)).subscribe({
      next: (val) => {
        console.log(val);
        if (val.email) {
          window.localStorage.setItem('email', val.email);
        }
      },
    });
  }
  QmarkError: boolean = false;

  QMarkneeded(control: AbstractControl) {
    if (control.value.includes('?')) {
      return null;
    }
    return { QMarkNotThere: true };
  }

  OnSubmit() {
    if (this.form.controls.password.errors) {
      console.log(this.form.controls.password.errors);
      const error = this.form.controls.password.errors['QMarkNotThere'];
      console.log(error);
      if (error) {
        this.QmarkError = true;
      }
    }
    if (this.form.invalid) {
      console.log(this.form);
      return;
    }
    console.log(this.form);
    this.form.reset();
  }
}
