import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ResetTokenService } from '../../../service/reset-token-service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  resetToken: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  token!:any;

  constructor(private resetTokenService: ResetTokenService, private authService: AuthService, private router: ActivatedRoute, private toastr: ToastrService) {

    this.router.queryParamMap.subscribe((params: ParamMap) => {
      const resetToken = params.get('resetToken');

      // console.log("reset"+resetToken)
      if (resetToken !== null) {
        this.resetTokenService.setToken(resetToken);
      } else {
        console.log('Reset token is missing or invalid.');
      }
    });
  }
  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.token= params.get('token');
      if (this.token) {
        // Do something with the token, such as storing it in a variable or using it for authentication.
        console.log('Token:', this.token);
      } else {
        console.log('No token found in URL.');
      }
    });
  }

  resetPassword(formData: NgForm) {
    //console.log(formData.value.newPassword);
    //console.log(formData.value.confirmPassword);
    if (formData.value.newPassword !== formData.value.confirmPassword) {
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }
    // console.log("Token +>"+this.resetToken)

    const resetData = {
      resetToken:this.token,
      newPassword: formData.value.newPassword,
      confirmPassword: formData.value.confirmPassword,
    };

    this.authService.resetPassword(this.token,formData.value.newPassword,formData.value.confirmPassword);
  }
}
