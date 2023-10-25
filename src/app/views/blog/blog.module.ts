import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule } from '@angular/forms'
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { ToastrModule } from 'ngx-toastr';
import { BlogRoutingModule } from './blog-routing.module';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { SpinnerModule } from '@coreui/angular';


@NgModule({
  declarations: [
    AddBlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,FormsModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    ToastrModule,
    SpinnerModule


  ]
})
export class BlogModule { }
