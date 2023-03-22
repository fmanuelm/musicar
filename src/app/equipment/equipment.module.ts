import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EquipmentsRoutes } from './equipment.routing';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EquipmentsRoutes),
    TableModule
  ]
})
export class EquipmentModule { }
