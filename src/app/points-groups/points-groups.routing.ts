import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';






export const PointsGroupsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'list',
      component: ListComponent
    }]
  },
  {
    path: '',
    children: [{
      path: 'create',
      component: CreateComponent
    }]
  }
];
