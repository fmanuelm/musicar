import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { PointsRoutes } from './points.routing';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PointsRoutes),
    TableModule
  ]
})
export class PointsModule { }
