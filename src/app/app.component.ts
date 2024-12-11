import { Component, OnInit } from '@angular/core';

import { LoginComponent } from './auth/login/login.component';
import { AsyncPipe } from '@angular/common';
import { SignupComponent } from './auth/signup/signup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginComponent, AsyncPipe, SignupComponent],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
}
