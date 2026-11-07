import { Component } from '@angular/core';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  constructor(
    public authService: AuthService
  ) {}

}