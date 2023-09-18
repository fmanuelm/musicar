import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { ClientsGroupsRoutes } from './clientsgroups.routing';
import { TableModule } from 'primeng/table';
import { MaterialModule } from '../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    DetailComponent,
    EditComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ClientsGroupsRoutes),
    TableModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule
  ]
})
export class ClientsgroupsModule { }