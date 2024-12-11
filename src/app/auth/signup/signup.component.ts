import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordMatch } from '../../../valdators/psswordmatch';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule,NgIf],
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl(),
    pwd: new FormControl("", [Validators.required, Validators.minLength(6)]),
    cpwd: new FormControl("", [Validators.required, Validators.minLength(6)]),
    fname: new FormControl(),
    lname: new FormControl(),
    addresses: new FormGroup({
      street: new FormControl(),
      number: new FormControl(),
      postalcode: new FormControl(),
      city: new FormControl(),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student'),
    agree: new FormControl(null, {
      validators: Validators.required,
    }),
    findus: new FormArray([
      new FormControl(),
      new FormControl(),
      new FormControl(),
    ]),
  }, { validators: passwordMatch("pwd", "cpwd") });

  OnSubmit() {
    if (this.form.invalid) {
      console.log('Form is Invalid');
      console.log(this.form);
      return;
    }
    console.log('Form is valid');
    console.log(this.form);
  }

  reset() {
    this.form.reset();
  }
}
