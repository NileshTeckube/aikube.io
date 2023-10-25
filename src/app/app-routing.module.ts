import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ResetPasswordRequestComponent } from './views/pages/reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from './views/pages/reset-password/reset-password.component';
// import { VerifcationCodeComponent } from './views/pages/verifcation-code/verifcation-code.component';
 import { EditUserComponent} from './views/pages/edit-user/edit-user.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
// import { routeGuard} from './Guard/route.guard'
import { UploadProfileImageComponent } from './views/pages/upload-profile-image/upload-profile-image.component';
const routes: Routes = [
  {
    path: 'dashboard',


    redirectTo: 'dashboard' ,
    pathMatch: 'full'
  },
  {
    path: 'home',    //canActivate:[routeGuard]
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },

    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      { path: 'upload-profile-image', component: UploadProfileImageComponent },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path:'blog',
        loadChildren:()=> import('./views/blog/blog.module').then((m)=>m.BlogModule)

      },
      {
        path:'support',
        loadChildren:()=> import('./views/support/support.module').then((m)=>m.SupportModule)

      },
      {
        path:'user',
        loadChildren:()=> import('./views/pages/user/user.module').then((m)=>m.UserModule)

      },
      {
        path:'pipeline',
        loadChildren:()=> import('./views/pipeline/pipeline.module').then((m)=>m.PipelineModule)

      },

      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },

  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },


  {
    path: 'edituser',
    component: EditUserComponent,
    data: {
      title: 'Edit User'
    }
  },


  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'register Page'
    }
  },
  {
    path: 'login/resetPasswordRequest',
    component: ResetPasswordRequestComponent,
    data: {
      title: 'Reset Password Request'
    }
  },
  {
    path: 'login/resetPassword/:token',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password'
    }
  },
  {path: '**', component:Page404Component},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      useHash: false
      // relativeLinkResolution: 'legacy',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
