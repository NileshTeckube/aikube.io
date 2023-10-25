import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
  export class ResetTokenService {
    private resetToken: string | null = null;
  
    setToken(token: string) {
      this.resetToken = token;
    }
  
    getToken(): string | null {
      return this.resetToken;
    }
  }
  