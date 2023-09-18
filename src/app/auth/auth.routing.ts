import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { RegisterComponent } from './register/register.component';

export const AuthRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: LoginComponent
    }]
  },
  {
    path: 'change_password',
    children: [{
      path: '',
      component: ChangepasswordComponent
    }]
  },
  {
    path: 'new_password',
    children: [{
      path: '',
      component: NewpasswordComponent
    }]
  },
  {
    path: 'register',
    children: [{
      path: '',
      component: RegisterComponent
    }]
  }
];
