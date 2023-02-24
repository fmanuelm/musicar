import { Routes } from '@angular/router';

import { DataTableComponent } from './list/datatable.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';

export const ClientsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'list',
      component: DataTableComponent
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
      path: 'edit/:id',
      component: EditComponent
    }]
  }, {
    path: '',
    children: [{
      path: 'datail/:id',
      component: DetailComponent
    }]
  }
];
