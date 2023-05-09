import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DashboardComponent } from './dashboard/dashboard.component';






export const EquipmentMonitorRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'list',
      component: ListComponent
    }]
  }, {
    path: '',
    children: [{
      path: 'detail/:id',
      component: DashboardComponent
    }]
  }
];
