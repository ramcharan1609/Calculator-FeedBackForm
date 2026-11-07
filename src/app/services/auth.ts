import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private username = 'student';
  private password = '1234';

  login(username: string, password: string): boolean {

    if (
      username === this.username &&
      password === this.password
    ) {

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);

      return true;
    }

    return false;
  }


  logout(): void {

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

  }


  isLoggedIn(): boolean {

    return localStorage.getItem('isLoggedIn') === 'true';

  }


  getUsername(): string {

    return localStorage.getItem('username') || 'Student';

  }

}