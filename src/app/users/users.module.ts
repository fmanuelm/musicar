import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { MaterialModule } from '../app.module';
import { RouterModule } from '@angular/router';
import { UsersRoutes } from './users.routing';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ButtonsLinkComponent } from './buttons-link/buttons-link.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';




@NgModule({
  declarations: [
    ListComponent,
    BreadcrumbComponent,
    ButtonsLinkComponent,
    CreateComponent,
    EditComponent,
    DetailComponent
  ],
  imports: [
    RouterModule.forChild(UsersRoutes),
    CommonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule,
  ]
})
export class UsersModule { }
