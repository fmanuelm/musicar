import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';



export const PointsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'list',
      component: ListComponent
    }]
  }
];