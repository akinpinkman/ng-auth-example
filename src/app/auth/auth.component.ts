import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    let authObs: Observable<AuthResponse>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe({
      next: (resData) => {
        console.log('Response Data:', resData); // Log the response
        if (resData.email === 'ako@ako.com' && resData.password === password) {
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        } else {
          this.error = 'Invalid email or password!';
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.log('Error:', err); // Log the error
        this.error = 'An error occurred!';
        this.isLoading = false;
      },
    });

    form.reset();
  }
}
