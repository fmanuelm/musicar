import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreationComponent } from './creation/creation.component';
import { HomeComponent } from './home/home.component';
import { BriefcaseComponent } from './briefcase/briefcase.component';


export const MessagesRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'home',
      component: HomeComponent
    }]
  },
  {
    path: '',
    children: [{
      path: 'creation',
      component: CreationComponent
    }]
  },
  {
    path: '',
    children: [{
      path: 'briefcase/:id',
      component: BriefcaseComponent
    }]
  }
];
