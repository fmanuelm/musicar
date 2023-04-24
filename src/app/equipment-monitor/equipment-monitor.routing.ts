import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';






export const EquipmentMonitorRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'list',
      component: ListComponent
    }]
  }
];
