import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.scss'],
})
export class ResetPasswordRequestComponent {
  email: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  resetPasswordRequest(formData:NgForm) {
    console.log(formData.value.email);
    if (!formData.value.email) {
      this.toastr.error('Email is required.', 'Error');
       return;
     }

     const resetData = {
       email: this.email,
     };

     this.authService.resetPasswordRequest(formData.value.email);
  }
}
