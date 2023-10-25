import { Injectable, Type } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class TokenService {
  token: any;

  constructor(private authService: AuthService) {}

  fetchToken(): void {
    this.token = localStorage.getItem('token');
  }

}
