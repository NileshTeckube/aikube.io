import { Component } from '@angular/core';

import { AuthService } from '../../../service/auth.service';

import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { NgForm } from '@angular/forms';

import { ResetTokenService } from '../../../service/reset-token-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private AuthService: AuthService,
    private toastr: ToastrService,
    private resetTokenService: ResetTokenService
  ) {

  }

  setResetToken(token: string) {
    this.resetTokenService.setToken(token);
  }

  public signIn(formData: NgForm): void {
    this.AuthService.login(formData.value);
  }
}
