import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { UserRoutingModule } from './user-routing.module';
import { LogsComponent } from './logs/logs.component';
import {MatDividerModule} from '@angular/material/divider';
import { CardModule } from '@coreui/angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { GridModule } from '@coreui/angular';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
//import { MomentDateModule } from '@angular/material-moment-adapter';

import { MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TableModule, UtilitiesModule } from '@coreui/angular';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    LogsComponent,


  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatDividerModule,
    CardModule,
    MatFormFieldModule,
    MatSelectModule,
    GridModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
    //MomentDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TableModule,
    ReactiveFormsModule




  ]
})
export class UserModule { }
