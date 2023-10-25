import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPipelineComponent } from './add-pipeline/add-pipeline.component';
import { PipelineRoutingModule } from './pipeline-routing.module';
import { ModalModule } from '@coreui/angular';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { TableModule, UtilitiesModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms'
import { PaginationModule } from '@coreui/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerModule } from '@coreui/angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditPipelineComponent } from './edit-pipeline/edit-pipeline.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

import { PopupComponent } from './popup/popup.component';




@NgModule({
  declarations: [
    AddPipelineComponent,
    EditPipelineComponent,
    PopupComponent,
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    PipelineRoutingModule,
    ModalModule, GridModule,
    CardModule, ButtonModule,
    FormModule,
    TableModule, UtilitiesModule,
    IconModule,
    FormsModule,
    PaginationModule,
    NgxPaginationModule,
    SpinnerModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    IconSetService,
  ]
})
export class PipelineModule { }
