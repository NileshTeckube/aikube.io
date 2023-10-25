import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogsComponent } from './user/logs/logs.component';
import { AddPipelineComponent } from '../pipeline/add-pipeline/add-pipeline.component';
// import { PasswordResetComponent} from './password-reset/password-reset.component'
// import { VerifcationCodeComponent } from './verifcation-code/verifcation-code.component'
// import { EditUserComponent } from './edit-user/edit-user.component'



const routes: Routes = [


  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'logs',
    component: LogsComponent,
    data: {
      title: 'Logs'
    }
  },
  {
    path: 'add-pipeline',
    component: AddPipelineComponent,
    data: {
      title: 'Add Pipeline'
    }
  },

  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  // {
  //   path: 'resetPassword',
  //   component: PasswordResetComponent,
  //   data: {
  //     title: 'Login Page'
  //   }
  // },

  // {
  //   path: 'verificationCode',
  //   component: VerifcationCodeComponent,
  //   data: {
  //     title: 'Verification'
  //   }
  // },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  // {
  //   path: 'edituser',
  //   component: EditUserComponent,
  //   data: {
  //     title: 'Edit User'
  //   }
  // },
  {path: '**', component:Page404Component},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
