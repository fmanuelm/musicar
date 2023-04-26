import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';







export const UsersRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'list',
      component: ListComponent
    }]
  }, {
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
  {
    path: '',
    children: [{
      path: 'edit/:id',
      component: EditComponent
    }]
  },
];
