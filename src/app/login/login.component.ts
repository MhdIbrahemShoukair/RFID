import { Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatGridListModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router) {
  }

  readonly username = new FormControl('', [Validators.required, Validators.email]); // using email validation possible only user names
  readonly password = new FormControl('', [Validators.required]);
  hide = signal(true);
  errorMessages = {
    username: signal(''),
    password: signal(''),
  };

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public setAuth() {
    localStorage.setItem('authToken', '123');
    this.router.navigate(['/dashboard']);
  }

  updateErrorMessage() {
    if (this.username.hasError('required')) {
      this.errorMessages.username.set('You must enter a value');
    } else if (this.username.hasError('username')) {
      this.errorMessages.username.set('Not a valid username');
    } else {
      this.errorMessages.password.set('');
    }

    if (this.password.hasError('required')) {
      this.errorMessages.password.set('You must enter a password');
    } else {
      this.errorMessages.password.set('');
    }
  }
}
