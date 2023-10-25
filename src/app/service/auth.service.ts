import { ComponentFactoryResolver, Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { DataService } from "../service/data.service"

import { Router } from '@angular/router';


import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface HomeDataResponse {
  userCount: any;
  userIncome: any;
  userConversionRate: any;
  userSessions: any;
  traffic: any;
  companyUsers: any;
  profileImage: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;

  public profileImageUrlChanged = new EventEmitter<string>();

  private valSubject = new Subject<any>();
  getValObservable(): Observable<any> {
    // console.log('getVal method called');
    return this.valSubject.asObservable();
  }

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService, public data: DataService) { }

  public signupUser(signupData: any) {

    return this.http
      .post<any>(`${this.baseUrl}/api/user/signup`, signupData)
      .subscribe((response) => {
        console.log(response);
        console.log(response.status);
        if (response.status == 'success') {
          this.toastr.success("An Email has been sent.Please verify it.");
          this.router.navigate(['/']);


        } else {
          this.toastr.warning('Something went wrong')
        }

      });
  }

  public login(loginData: any) {
    this.http
      .post<any>(`${this.baseUrl}/api/user/login`, loginData)
      .subscribe((res) => {

        if (res.status == 'error') {
          this.toastr.warning(res.message)
          this.router.navigate(['/']);

        } else if (res.status == 'success') {
          // console.log('Res status:', res.status);
          // console.log('Res val:', res.val);
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.userId);
          this.data.userDashboardCount = res.userCount;
          // this.data.userIncome=res.userIncome;
          // this.data.userConversionRate=res.userConversionRate;
          // this.data.userSessions=res.userSessions;
          // this.data.traffic=res.traffic;

          // this.data.companyUsers = res.companyUsers;

          //console.log("login token from authService=> "+res.token)
          this.router.navigate(['home/dashboard']);
          // console.log('res.val:', res.val);

          if (res.val != 0) {
            this.valSubject.next(res.val);
          } else {
            this.valSubject.next(null);
          }
        }
        //console.log(res);
      });
  }

  editProfileImage(editData:any): Promise<boolean> {

    return new Promise((resolve, reject) => {
      this.http.put<any>(`${this.baseUrl}/api/user/editProfileImage`, editData)
        .subscribe(
          (res) => {
            // Handle the response from the edit API here if needed
            console.log('User profile updated successfully:', res);
            resolve(true);
          },
          (error) => {
            console.error('Error updating user profile:', error);
            reject(false);
          }
        );
    });
  }

  public edit(editData: any) {
    this.http.put<any>(`${this.baseUrl}/api/user/edit`, editData).subscribe((res) => {
      //console.log(res)

      if (res.status == 'error') {
        this.toastr.error("Something went wrong.Please Login again")
        this.removeItem()
      }
      else {
        this.toastr.success("Edited successfully")
      }
    })

  }

  public resetPasswordRequest(email: string) {
    const requestData = { email: email };
    console.log("email", requestData)

    this.http.post<any>(`${this.baseUrl}/api/user/resetPasswordRequest`, requestData).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.toastr.success('An email has been sent with instructions to reset your password.');
          this.router.navigate(['/login']);
        } else {
          this.toastr.warning('Password reset request failed.');
        }
      },
      (error) => {
        this.toastr.error('An error occurred. Please try again later.');
      }
    );
  }

  public resetPassword(resetToken: string, newpassword: string, confirmPassword: string) {


    const data = {
      resetToken: resetToken,
      newPassword: newpassword,
      confirmPassword: confirmPassword
    };
    //console.log(JSON.stringify(data))
    this.http.post<any>(`${this.baseUrl}/api/user/resetPassword`, data).subscribe((res) => {
      console.log(res);
      //console.log("Data "+resetData)
      if (res.status === 'success') {
        this.toastr.success('Password reset successful.');
        this.router.navigate(['/login']);
      } else if (res.status === 'invalid_token') {
        this.toastr.warning('Invalid or expired reset token.');
      } else {
        this.toastr.warning('Password reset failed.');
      }
    });
  }

  public logout() {
    this.http.get<any>(`${this.baseUrl}/api/user/logout`).subscribe(
      (res) => {
        if (res.status === 'success') {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          this.toastr.success('Logged out successfully');
        } else {
          this.toastr.error('Logout failed');
        }
      },
      (error) => {
        console.error('Logout API error:', error);
        this.toastr.error('An error occurred during logout.');
      }
    );
  }

  getHomeData(token: string) {
    const url = `${this.baseUrl}/api/user/home`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<HomeDataResponse>(url, { headers });
  }

  appVersion: string = '';

  setVersion(version: string) {
    this.appVersion = version;
    console.log("auth " + this.appVersion)
  }

  getVersion() {
    return this.appVersion
  }

  public removeItem() {
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }

}
