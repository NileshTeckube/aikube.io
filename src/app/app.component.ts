import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { TokenService} from './service/token.service';
import { AuthService } from './service/auth.service';
const {version: appVersion }= require('../../package.json');


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'AiKube';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private tokenservice:TokenService,
    private AuthService:AuthService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
    console.log("versionFromApp: "+appVersion)
    this.AuthService.setVersion(appVersion);
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });

    this.tokenservice.fetchToken();

  }
}
