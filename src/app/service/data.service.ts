import { Injectable, Type } from '@angular/core';
import { AuthService } from './auth.service';
import { DashboardComponent } from '../views/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root',
})

export class DataService  {
  profileImageUrl:string='';
  userDashboardCount:string='0';
  // userIncome:boolean = true;
  // userConversionRate:boolean = true;
  // userSessions:boolean = true;
  // traffic:boolean = false;
  // companyUsers: any;
  dashboardCount:string='0';
  income:boolean = true;
  conversionRate:boolean = true;
  sessions:boolean = true;
  trafficDetails:boolean = false;
  companyUsersDetails: any;
  profileImage:string='';
}
