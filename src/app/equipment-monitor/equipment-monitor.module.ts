import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../app.module';
import { EquipmentMonitorRoutes } from './equipment-monitor.routing';


import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ButtonsLinkComponent } from './buttons-link/buttons-link.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    ListComponent,
    BreadcrumbComponent,
    ButtonsLinkComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forChild(EquipmentMonitorRoutes),
    CommonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule,
  ]
})
export class EquipmentMonitorModule { }
