import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { ModalModule } from '@coreui/angular';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { TableModule, UtilitiesModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { FormsModule} from '@angular/forms'
import { PaginationModule } from '@coreui/angular';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerModule } from '@coreui/angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    TicketsComponent,
    EditTicketComponent
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    SupportRoutingModule,
    ModalModule,GridModule,
    CardModule,ButtonModule,
    FormModule,
    TableModule,UtilitiesModule,
    IconModule,
    FormsModule,
    PaginationModule,
    NgxPaginationModule,
    SpinnerModule


  ],
  providers:[
    IconSetService,
  ]
})
export class SupportModule { }
