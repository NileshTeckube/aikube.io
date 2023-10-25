import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetTokenService } from './service/reset-token-service';
import { NgScrollbarModule } from 'ngx-scrollbar';


// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';

import {
  SpinnerModule,
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,

} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { LoginComponent } from './login/login.component';

import { environment } from '../environments/environment';
import { Interceptor} from './service/interceptor'





import { FirebaseModule } from './auth/firebase-auth/firebase-auth.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule} from '@angular/forms'
import { ToastModule } from '@coreui/angular';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatCardModule} from '@angular/material/card';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import {MatDialogModule} from '@angular/material/dialog';








const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, LoginComponent ],
  imports: [
    MatCardModule,
    MatDialogModule,
    CKEditorModule,
    BrowserModule,
    HttpClientModule,
    SpinnerModule,
    NgxPaginationModule,
    FormsModule,
    ToastModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,

    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
    // provideFirestore(() => getFirestore()),
    //provideRemoteConfig(() => getRemoteConfig()),
    FontAwesomeModule
  ],
  providers: [
    ResetTokenService,

    {provide: LocationStrategy,useClass: PathLocationStrategy},
     {provide: HTTP_INTERCEPTORS,useClass: Interceptor,multi: true}


    ,
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
