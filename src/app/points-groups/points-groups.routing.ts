import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';






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
  }, {
    path: '',
    children: [{
      path: 'detail/:id',
      component: DetailComponent
    }]
  },
];
