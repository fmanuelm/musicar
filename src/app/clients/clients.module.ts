import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { ClientsRoutes } from './clients.routing';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DataTableComponent } from './list/datatable.component';
import { DetailComponent } from './detail/detail.component';

import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    DataTableComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ClientsRoutes),
    TableModule
  ]
})
export class ClientsModule { }
