import { Component, Input, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../service/auth.service'
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Router } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { TokenService } from '../../../service/token.service'

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private authService: AuthService, private router: Router, private ngZone: NgZone, private cdRef: ChangeDetectorRef, public data: DataService, private tokenservice: TokenService) {
    super();
  }

  ngOnInit() {

  }

  logout() {
    this.tokenservice.fetchToken();
    this.authService.logout();
  }

  // logout(){
  //   this.authService.removeItem();

  // }



}
