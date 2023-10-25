import { Component, Injector } from '@angular/core';
import { FooterComponent } from '@coreui/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent extends FooterComponent {
  constructor(private authservice:AuthService,private injector: Injector) {


    super();
  }
  version:string=''
  ngOnInit() {
    this.showVersion()

  }

  showVersion(){
    const myService=this.injector.get(AuthService);
    this.version=myService.getVersion()
    console.log("footervsersion "+this.version)

  }












}
