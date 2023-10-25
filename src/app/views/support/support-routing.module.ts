import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component'
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';

const routes: Routes = [
  {path:'tickets',component:TicketsComponent},
  {path:'editTickets',component:EditTicketComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
