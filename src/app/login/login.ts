import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  login(): void {

    this.errorMessage = '';

    if (
      this.username.trim() === '' ||
      this.password.trim() === ''
    ) {

      this.errorMessage = 'Please enter username and password.';
      return;

    }


    const success = this.authService.login(
      this.username,
      this.password
    );


    if (success) {

      this.router.navigate(['/home']);

    } else {

      this.errorMessage =
        'Invalid username or password.';

    }

  }

}