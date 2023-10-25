import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

import { User } from 'src/app/service/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isConfirm: boolean = false;
  user: User = {} as User;
  loading!: boolean;
  selectedCountryCode: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // countryCodes: { name: string; code: string }[] = [
  //   { name: 'India', code: '+91' },
  //   { name: 'United States', code: '+1' },
  //   { name: 'United Kingdom', code: '+44' },
  //   { name: 'Canada', code: '+1' },
  //   { name: 'Singapore',code: '65'},
  //   { name: 'Sweden',code: '46'},
  //   { name: 'Switzerland',code: '	41'},
  //   { name: 'Thailand',code: '66'},
  //   { name: 'Turkey' , code: '90'},
  //   { name: 'South Korea' , code:'82'}

  // ];

  onSubmit(form: NgForm) {
    if (form.valid) {
      const resp = this.authService.signupUser(form.value);

      //console.log(form)
      form.reset();
    }
  }
}
