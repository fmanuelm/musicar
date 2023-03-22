import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';



export const EquipmentsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'list',
      component: ListComponent
    }]
  }
];