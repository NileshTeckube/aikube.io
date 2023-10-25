import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FirebaseModule } from 'src/app/auth/firebase-auth/firebase-auth.module';
import { FormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component';
import { UploadProfileImageComponent } from './upload-profile-image/upload-profile-image.component';
// import { DeleteUserComponent } from './delete-user/delete-user.component';

import { TableModule, UtilitiesModule } from '@coreui/angular';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,

    EditUserComponent,
     ResetPasswordComponent,
     ResetPasswordRequestComponent,
     UploadProfileImageComponent,
    // DeleteUserComponent,

  ],



  imports: [
    FormsModule,
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FirebaseModule,
    FontAwesomeModule,
    TableModule,UtilitiesModule


  ]
})
export class PagesModule {
}
