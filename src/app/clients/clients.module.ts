import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { ClientsRoutes } from './clients.routing';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DataTableComponent } from './list/datatable.component';
import { DetailComponent } from './detail/detail.component';

import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { MaterialModule } from '../app.module';
import { ClientsService } from './service/clients.service';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ButtonsLinkComponent } from './buttons-link/buttons-link.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    DataTableComponent,
    DetailComponent,
    ButtonsLinkComponent,
    BreadcrumbComponent,    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ClientsRoutes),
    TableModule, 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule,
    NgxMaterialTimepickerModule
  ]
})
export class ClientsModule { }
