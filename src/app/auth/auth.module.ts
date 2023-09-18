import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routing';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    ChangepasswordComponent,
    NewpasswordComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(AuthRoutes),
    ReactiveFormsModule
  ]
})
export class AuthModule { }
